import { useEffect } from 'react';

const SITE = 'FutureTech Africa';

/** Gives the current page its own title and description. */
export default function useSeo(title, description) {
  useEffect(() => {
    const tags = [...document.querySelectorAll('meta[name="description"], meta[property="og:description"]')];
    const titleTag = document.querySelector('meta[property="og:title"]');
    const previous = { title: document.title, og: titleTag?.content, descriptions: tags.map((tag) => tag.content) };
    const full = title ? `${title} | ${SITE}` : `${SITE} | Digital Products & Software`;

    document.title = full;
    if (titleTag) titleTag.content = full;
    if (description) tags.forEach((tag) => { tag.content = description; });

    return () => {
      document.title = previous.title;
      if (titleTag) titleTag.content = previous.og;
      tags.forEach((tag, index) => { tag.content = previous.descriptions[index]; });
    };
  }, [title, description]);
}
