import { ipcMain, dialog } from 'electron';
import NodeGit from 'nodegit';
var Repo = null;

export const openRepo = async (workingDir) => {
  console.log(workingDir);
  Repo = await NodeGit.Repository.open(workingDir)

  let paths = workingDir.split(require('path').sep);
  let repoName = paths[paths.length - 1];

  console.log(repoName);

  /*
    window.webContents.send('Repo-OpenSuccessful', { repoName: repoName, workingDir: workingDir });
    settings.setRepo(workingDir, repoName);
    repoHistory.updateRepos();
    checkSSHKey();
    getCurrentRemotes().then(remotes => {
        if (remotes.length > 0) {
            let url = remotes[0].url();
            window.webContents.send('Repo-RemotesChanged', { remote: url });
        }
    }).catch(err => {
    });
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        refreshRepo();
    }, 10 * 1000);
    return refreshRepo();
  */
}

export const fetchRemotes = async () => {
  const strs = await Repo.getRemotes()

  let reqs = [];
  console.log(strs)

  strs.forEach(r => {
      reqs.push(Repo.getRemote(r));
  });

  return Promise.all(reqs);
}

export const getReferences = async () => {
    return Repo.getReferences(NodeGit.Reference.TYPE.LISTALL).then(refs => {

        refs = refs.filter(_ => _.shorthand() !== 'stash');
        let remoteRefs = refs.filter(_ => _.isRemote());
        let localRefs = refs.filter(_ => _.isBranch());

        localRefs.forEach(localR => {
            let matching = remoteRefs.filter(ref => ref.shorthand().indexOf(localR.shorthand()) !== -1);
            if (matching.length) {
                localR.diff = localR.cmp(matching[0]);
            }
        })

        let references = refs.map(ref => {
            let display = "";
            if (ref.isBranch()) {
                display = ref.shorthand();
            } else if (ref.isRemote()) {
                let names = ref.shorthand().split('/');
                display = names.splice(1, names.length).join('/');
            } else if (ref.isTag()) {
                display = ref.shorthand();
            }
            return {
                target: ref.target().toString(),
                isBranch: ref.isBranch(),
                isRemote: ref.isRemote(),
                isTag: ref.isTag(),
                name: ref.name(),
                shorthand: ref.shorthand(),
                display: display
            }
        });


        let refDict = {};
        references.forEach(ref => {
            if (refDict[ref.target]) {
                refDict[ref.target].push(ref);
            } else {
                refDict[ref.target] = [ref];
            }
        })

        return { references: references, refDict: refDict };
    })
}

const repoService = {
  openRepo,
  fetchRemotes,
  getReferences,
}

export default repoService;
