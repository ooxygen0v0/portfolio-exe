function SkillCard({ name, description, category }) {
  return (
    <article
      className="
        rounded-xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-sky-600 hover:shadow-lg
        dark:border-slate-700 dark:bg-slate-900
        dark:hover:border-cyan-400
        dark:hover:shadow-cyan-500/10
      "
    >
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
        {name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <span
        className="
          mt-5 inline-block rounded-md
          bg-sky-50 px-3 py-1
          text-xs text-sky-700
          dark:bg-slate-800 dark:text-cyan-400
        "
      >
        {category}
      </span>
    </article>
  )
}

export default SkillCard
