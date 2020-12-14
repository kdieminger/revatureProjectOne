# Git

An Open-source collaborative version control system that is often used for source code management.
Git is structured as a shared repository that utilizes branches to track changes in code.

## Repository
A location where we can store code.
Git has two types of repositories:

### Remote/Central
The canonical/official copy of the code and all of it's versions.
Usually located in the cloud. [our repository](http://gitlab.com/revature_batches/2012-dec14-react)

### Local
The copy of that remote repository that exists on your machine.

Clone remote repository to our local machine:
`git clone http://gitlab.com/revature_batches/2012-dec14-react`

## Commands
* `git clone` - Creates a local copy of a remote repository
* `git status` - Displays information about the local repository, including changes you've made to it.
* `git add` - Adds a specific file to the change tracker. Any file I have made changes to, will have to be added to the commit. (assuming I want those changes to go to remote, of course.)
* `git commit -m "a message about the commit"` - Save a packet of changes that can be sent to the remote repository.
* `git push origin {branchname}` - pushes commits to the branch.
* `git checkout {branchname}` and `git checkout -b {branchname}`
* `git pull origin {branchname}` - pulls commits from remote to local.
* `git fetch` - checks remote repo for branches not present in local repo.

## Definitions
### Branches
A collection of commits in the repository. It tracks changes as a modification of a "base" branch.
### Commits
A Commit is a group or subset of changes to the repository that can pushed or pulled from the remote repository and allows us to modify the repository.
### Merge Conflict
Commits to the same file/lines from different branches or local repositories can result in a merge conflict that has to be resolved manually.

# Playground
This should do it.

This should disappear when I switch back to master.
Trying to create another merge conflict.
No, *it is I who creates conflict*
Writing something in master.
