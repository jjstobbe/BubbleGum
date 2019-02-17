import { ipcMain, dialog } from 'electron';
import NodeGit from 'nodegit';
import { refreshBranches } from '../actions/branchActions';
var repo = null;

export const openRepo = async (workingDir) => {
  repo = await NodeGit.Repository.open(workingDir)

  let paths = workingDir.split(require('path').sep);
  let repoName = paths[paths.length - 1];

  return { repo: repo, repoName: repoName };
}

export const repoFetch = async () => {
  const remotes = await getCurrentRemotes();

  await repo.fetch(remotes[0], {
    callbacks: {
      credentials: (url, username) => {
        // TODO: Don't commit these, store them somewhere (in cache or something)
        return NodeGit.Cred.userpassPlaintextNew('<username>', '<password>');
      },
      certificateCheck: () => 1
    }
  });
}

export const getAllBranches = async () => {

  return repo.getReferences(NodeGit.Reference.TYPE.LISTALL).then(refs => {
      refs = refs.filter(_ => _.shorthand() !== 'stash');

      const branchRefs = refs.filter(_ => _.isBranch())
      const remoteRefs = refs.filter(_ => _.isRemote());

      let branchDict = {}
      branchRefs.forEach(ref => {
        branchDict[ref.target().toString()] = {
          display: ref.shorthand(),
          isLocal: true
        }
      })

      let exclusivelyRemoteRefs = []
      remoteRefs.forEach(remoteRef => {
        const found = branchRefs.some((branchRef) => {
          return remoteRef.shorthand().indexOf(branchRef.shorthand()) !== -1;
        })

        if (!found) {
          exclusivelyRemoteRefs.push(remoteRef);
        }
      })

      let remoteDict = {}
      exclusivelyRemoteRefs.forEach(ref => {
        const name = ref.shorthand().split('/');
        const display = name.splice(1, name.length).join('/');

        remoteDict[ref.target().toString()] = {
          display,
          isLocal: false
        }
      })

      return { branchDict, remoteDict };
  })
}

export const changeToRemoteBranch = async (branchName) => {
  const ref = await repo.getReference(`refs/remotes/origin/${branchName}`)
  const target = ref.target();
  let localRef = await repo.createBranch(branchName, target, true);
  localRef = await NodeGit.Branch.setUpstream(localRef, branchName);
  repo.checkoutBranch(localRef);
}

export const getCurrentRemotes = async () => {
  const strs = await repo.getRemotes()
  let requests = [];

  strs.forEach(r => {
    requests.push(repo.getRemote(r));
  });

  return Promise.all(requests);
}

export const setCurrentRepo = async (repoToSet) => {
  repo = repoToSet;
}

export const getStatus = async () => {
  const statuses = await repo.getStatus();
  console.log(statuses);
}

const repoService = {
  openRepo,
  getAllBranches,
  changeToRemoteBranch,
  setCurrentRepo,
  repoFetch,
  getStatus,
}

export default repoService;
