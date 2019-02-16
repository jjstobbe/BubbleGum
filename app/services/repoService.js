import { ipcMain, dialog } from 'electron';
import NodeGit from 'nodegit';
var Repo = null;

export const openRepo = async (workingDir) => {
  Repo = await NodeGit.Repository.open(workingDir)

  let paths = workingDir.split(require('path').sep);
  let repoName = paths[paths.length - 1];

  console.log(repoName);
}

export const getAllBranches = async () => {
  return Repo.getReferences(NodeGit.Reference.TYPE.LISTALL).then(refs => {
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
  console.log(branchName);
  const ref = await Repo.getReference(`refs/remotes/origin/${branchName}`)
  const target = ref.target();
  let localRef = await Repo.createBranch(branchName, target, true);
  localRef = await NodeGit.Branch.setUpstream(localRef, branchName);
  Repo.checkoutBranch(localRef);
}

const repoService = {
  openRepo,
  getAllBranches,
  changeToRemoteBranch,
}

export default repoService;
