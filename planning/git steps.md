# Git Workflow

## Step 0: Before working, make sure master branch is updated
  `> git checkout master`
  `> git pull origin master`

## Step 1: Switch to feature branch
  `> git checkout feature/new-branch`
* If no previous feature branch, create new branch and switch to it:
  `> git checkout -b feature/new-branch`
  `> git branch` (to confirm on feature branch)

## Step 2: Add files and commit intermittently/ when feature complete
  `> git add .`
  `> git commit -m "commit message"`

## Step 3: Switch to master branch, pull any new changes
  `> git checkout master`
  `> git pull origin master`

## Step 4: Switch to feature branch, merge new changes from master to feature branch
  `> git checkout feature/new-branch`
  `> git merge master`
  * if vim opens:
    * save: esc, :w, enter
    * quit: esc, :x, enter

## Step 5: Resolve Conflicts
* Resolve if any merge conflicts (be cautious to not delete teammates work)
* Verify all features still work, then commit fixes
  `> git add .`
  `> git commit -m "fix merge conflict"`

## Step 6: Switch to master branch for final merge and push
* Once everything has been committed, switch to master branch for final merge and push
`> git checkout master`
`> git merge feature/new-branch`
`> git push origin master`



## Alternative for Step 3: push feature branch to cloud, merge to master branch
  `> git push origin feature/new-branch` (now it's in the cloud)
* Open pull request on github repo page (request to merge changes)
  * Create pull request
    * At this step, anyone on team can review files that were changed
  * Merge pull request > create a merge commit > confirm merge





### Merging vs Rebasing
https://www.atlassian.com/git/tutorials/merging-vs-rebasing
- merging feature branch will have extraneous merge commit every time you need to incorporate upstream changes, which can pollute your feature branch's history
- rebasing feature branch moves entire feature branch to begin on top of the main branch, incorporating all new commits in main
`> git checkout feature/new-branch`
`> git rebase master`

### Vasily's Git Workflow
https://github.com/vasiliy-klimkin/lhl-lectures/blob/master/w05d05-Midterm-KickOff/git-workflow.md
