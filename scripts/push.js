// Stages every change, commits it with the given message and pushes to GitHub.
// Usage: npm run push -- "Commit message"
// Pushing to main also redeploys the site (see .github/workflows/deploy.yml).
import { execFileSync } from 'node:child_process'

const message = process.argv.slice(2).join(' ').trim()
if (!message) {
  console.error('Write a commit message: npm run push -- "What changed"')
  process.exit(1)
}

const git = (...args) => execFileSync('git', args, { stdio: 'inherit' })
const hasChanges = execFileSync('git', ['status', '--porcelain']).toString().trim() !== ''

if (hasChanges) {
  git('add', '-A')
  git('commit', '-m', message)
} else {
  console.log('Nothing new to commit, pushing what is already committed.')
}
git('push')
