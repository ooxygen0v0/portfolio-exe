import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { getLocalized } from './getLocalized'
import { githubUsername } from '../config/github'

const helpCommands = [
  ['help', 'help'],
  ['whoami', 'whoami'],
  ['pwd', 'pwd'],
  ['ls', 'ls'],
  ['ls projects', 'lsProjects'],
  ['cd projects', 'cdProjects'],
  ['cd ..', 'cdParent'],
  ['cat <filename>', 'cat'],
  ['skills', 'skills'],
  ['projects', 'projects'],
  ['github', 'github'],
  ['clear', 'clear'],
]

// 순수 계산 함수: 브라우저 명령이나 실제 시스템 셸을 실행하지 않습니다.
export function runTerminalCommand(input, directory, t, language = 'ko') {
  const parts = input.trim().toLowerCase().split(/\s+/)
  const command = parts[0]
  const argument = parts.slice(1).join(' ')

  function result(output = [], nextDirectory = directory, clear = false) {
    return { output, directory: nextDirectory, clear }
  }

  switch (command) {
    case 'help':
      return result([
        t('terminal.helpTitle'),
        ...helpCommands.map(
          ([syntax, key]) => `${syntax.padEnd(16)} - ${t(`terminal.commands.${key}`)}`
        ),
      ])

    case 'whoami':
      return result([t('terminal.identity'), t('terminal.interest')])

    case 'pwd':
      return result([
        directory === 'home' ? '/home/visitor' : '/home/visitor/projects',
      ])

    case 'ls':
      if (directory === 'home' && argument === '') {
        return result(['about.txt  skills.txt  projects/'])
      }
      if ((directory === 'home' && argument === 'projects') ||
          (directory === 'projects' && argument === '')) {
        return result(projects.map((project) => `${project.id}.txt`))
      }
      return result([t('terminal.errors.ls', { path: argument || '.' })])

    case 'cd':
      if (argument === '' || argument === '..' || argument === '~') {
        return result([], 'home')
      }
      if (argument === 'projects' && directory === 'home') {
        return result([], 'projects')
      }
      return result([t('terminal.errors.cd', { path: argument })])

    case 'cat':
      if (directory === 'home' && argument === 'about.txt') {
        return result([t('terminal.identity'), t('terminal.about')])
      }
      if (directory === 'home' && argument === 'skills.txt') {
        return result(skills.map((skill) => skill.name))
      }
      if (directory === 'projects') {
        const project = projects.find((item) => `${item.id}.txt` === argument)
        if (project) {
          return result([
            project.title,
            getLocalized(project, language).description,
            t('terminal.tech', { technologies: project.technologies.join(', ') }),
          ])
        }
      }
      return result([t('terminal.errors.cat', { file: argument })])

    case 'skills':
      return result(skills.map((skill) => skill.name))

    case 'projects':
      return result(projects.map((project) =>
        `${project.title} - ${getLocalized(project, language).summary}`
      ))

    case 'github':
      return githubUsername.trim()
        ? result([t('github.profileLink'), `https://github.com/${githubUsername.trim()}`])
        : result([t('terminal.githubPending'), t('terminal.githubLater')])

    case 'clear':
      return result([], directory, true)

    default:
      return result([
        t('terminal.errors.unknown', { command }),
        t('terminal.errors.helpHint'),
      ])
  }
}
