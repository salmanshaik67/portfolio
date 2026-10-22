import { motion } from 'framer-motion';
import { bannerChips } from '../../data/portfolio';
import { easeExpo, viewportOnce } from '../../lib/motion';

const tints = ['#00bbff', '#ffcc66', '#b4e48e', '#bb88ff'];

function Chip({ i }: { i: number }) {
  const chip = bannerChips[i]!;
  const Icon = chip.icon;
  return (
    <motion.span
      className="mx-1 inline-flex translate-y-[-0.06em] items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-1.5 pr-4 align-middle text-[0.8em] font-normal text-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
      variants={{ hidden: { opacity: 0, y: 14, scale: 0.9 }, shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeExpo } } }}
      whileHover={{ rotate: i % 2 ? 2 : -2, scale: 1.05 }}
    >
      <span className="grid h-[1.3em] w-[1.3em] place-items-center rounded-full" style={{ background: tints[i % tints.length] }}>
        <Icon className="h-[0.75em] w-[0.75em]" aria-hidden="true" />
      </span>
      {chip.label}
    </motion.span>
  );
}

/** Warm mesh-gradient statement band with inline chips. */
export function Banner() {
  return (
    <section aria-label="What I automate" className="relative isolate overflow-hidden px-4 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#e2523c]">
        <div className="animate-mesh absolute -left-[10%] -top-[30%] h-[90%] w-[60%] rounded-full bg-[#ff9a5c] blur-[90px]" />
        <div className="animate-mesh absolute left-[35%] top-[10%] h-[80%] w-[40%] rounded-full bg-[#f06aa8] blur-[100px] [animation-delay:-5s]" />
        <div className="animate-mesh absolute -right-[10%] -top-[20%] h-[70%] w-[45%] rounded-full bg-[#a86ee6] blur-[100px] [animation-delay:-9s]" />
        <div className="animate-mesh absolute -bottom-[30%] right-[5%] h-[80%] w-[45%] rounded-full bg-[#2fb5a0] blur-[100px] [animation-delay:-3s]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_50%,rgba(60,20,30,0.35),transparent_80%)]" />
      </div>

      <motion.p
        className="mx-auto max-w-4xl text-center text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.45] tracking-tighter2 text-white"
        initial="hidden"
        whileInView="shown"
        viewport={viewportOnce}
        variants={{ shown: { transition: { staggerChildren: 0.08 } } }}
      >
        Automating <Chip i={0} /> <Chip i={1} /> <Chip i={2} /> and <Chip i={3} />
        <br className="hidden md:block" /> infrastructure people actually rely on.
      </motion.p>
    </section>
  );
}
