import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { categories, skills } from '../data/skills'
import { getLocalized } from '../utils/getLocalized'
import SkillCard from '../components/SkillCard'
import Reveal from '../components/Reveal'

function Skills() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredSkills = skills.filter(
    (skill) => selectedCategory === 'all' || skill.category === selectedCategory
  )

  return (
    <main className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <p className="font-mono text-sky-700 dark:text-cyan-400">$ ls /skills</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {t('skills.title')}
      </h1>
      <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
        {t('skills.intro')}
      </p>

      <div className="mt-9 flex flex-wrap gap-2 sm:mt-12 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-5 ${
              selectedCategory === category.id
                ? 'bg-cyan-400 text-slate-950'
                : 'border border-slate-300 bg-white text-slate-600 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {t(`skills.categories.${category.id}`)}
          </button>
        ))}
      </div>

      <section className="mt-9 grid min-w-0 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, index) => (
          <Reveal key={skill.id} delay={Math.min(index * 0.06, 0.24)} className="h-full">
            <SkillCard
              name={skill.name}
              description={getLocalized(skill, language).description}
              category={t(`skills.categories.${skill.category}`)}
            />
          </Reveal>
        ))}
      </section>

      <p className="mt-8 font-mono text-sm text-slate-500">
        {t('skills.count', { visible: filteredSkills.length, total: skills.length })}
      </p>
    </main>
  )
}

export default Skills
