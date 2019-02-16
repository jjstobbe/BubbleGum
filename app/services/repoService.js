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
      let branchDict = {}

      branchRefs.forEach(ref => {
        branchDict[ref.target().toString()] = {
          display: ref.shorthand(),
          isLocal: true
        }
      })

      const remoteRefs = refs.filter(_ => _.isRemote());
      let remoteDict = {}

      remoteRefs.forEach(ref => {
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

const repoService = {
  openRepo,
  getAllBranches,
}

export default repoService;
