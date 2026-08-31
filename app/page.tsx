<div className="h-6 w-[1px] bg-[var(--card-border)] opacity-60 select-none pointer-events-none hidden lg:block" />

      {/* Action Trigger Block: Minimal Corporate Execution Link */}
      <div className="flex flex-col gap-0.5 min-w-0 items-end lg:items-start">
        <span className="text-[7px] font-bold text-[var(--text-dim)] tracking-widest uppercase opacity-60 tracking-wider">DOC_TUNNEL</span>
        
        <a
          href="https://drive.google.com/file/d/1TxM08OSjW_i_AeyTFcT0YflAVZZwa099/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group/cv flex items-center justify-between gap-1.5 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-[var(--text-muted)] bg-[var(--background)] border border-[var(--card-border)]/80 hover:border-green-500/30 hover:bg-green-500/[0.03] rounded transition-all duration-300 ease-out cursor-pointer max-w-full hover:shadow-[0_2px_8px_rgba(34,197,94,0.06)]"
        >
          <span className="truncate">fetch_cv.pdf</span>
          <ArrowUpRight size={11} className="text-[var(--text-dim)] group-hover/cv:text-green-500 transform group-hover/cv:translate-x-0.5 group-hover/cv:-translate-y-0.5 transition-all duration-300 ease-out shrink-0 stroke-[2.5]" />
        </a>
      </div> and <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-1">
          {[
            { label: "Curriculum Vitae", actionText: "Download Resume", icon: Binary, href: "https://drive.google.com/file/d/1TxM08OSjW_i_AeyTFcT0YflAVZZwa099/view?usp=sharing", id: "cv" },
            { label: "Electronic Mail", actionText: "mananchavda100@gmail.com", icon: ShieldCheck, href: "mailto:mananchavda100@gmail.com", id: "mail", copyable: true },
            { label: "Direct Communications", actionText: "+91 7574858088", icon: Workflow, href: "tel:+917574858088", id: "phone", copyable: true }
          ].map((link, lIdx) => {
            const LinkIcon = link.icon;
            return (
              <a key={lIdx} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex flex-col justify-between p-5 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950/20 transition-all duration-300 ease-out min-w-0 shadow-xs relative overflow-hidden cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 hover:scale-[1.01] group/link" >
                <span className="absolute bottom-0 left-0 h-[1.5px] bg-neutral-950 dark:bg-neutral-50 transition-all duration-300 w-0 group-hover/link:w-full" />
                <div className="flex items-center justify-between gap-3 w-full mb-5">
                  <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-[0.12em] font-sans block truncate uppercase">
                    {link.label}
                  </span>
                  <i className="ri-links-line   text-neutral-400 dark:text-neutral-500 opacity-60 group-hover/link:opacity-100 transition-all duration-200" />
                </div>
                <div className="flex items-center justify-between gap-2 w-full mt-auto">
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium font-sans text-[13px] tracking-wide transition-colors duration-200 truncate">
                    {link.actionText}
                  </span>
                  <i className="ri-arrow-right-up-line text-neutral-400 dark:text-neutral-500 opacity-40 transition-all duration-200 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100 shrink-0" />
                </div>
              </a>
            );
          })}
        </div>
