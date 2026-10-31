import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ eyebrow, title, text, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-lg mt-5 text-balance text-white">{title}</h2>
      {text && <p className={`lead mt-5 text-pretty ${centered ? 'mx-auto max-w-2xl' : ''}`}>{text}</p>}
    </Reveal>
  );
}
