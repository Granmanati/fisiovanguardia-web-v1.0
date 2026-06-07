import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";

export type ArticleHeading = {
  id: string;
  depth: 2 | 3;
  text: string;
};

type MarkdownSegment =
  | { type: "markdown"; content: string }
  | { type: "callout"; variant: "consulta" | "evidencia" | "nota"; content: string };

const calloutLabels = {
  consulta: "Consulta clínica",
  evidencia: "Evidencia",
  nota: "Nota"
};

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractArticleHeadings(markdown: string): ArticleHeading[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[2].replace(/[*_`#]/g, "").trim();
      return {
        id: slugifyHeading(text),
        depth: match[1] === "##" ? 2 : 3,
        text
      };
    });
}

function splitCallouts(markdown: string): MarkdownSegment[] {
  const segments: MarkdownSegment[] = [];
  const pattern = /\[!(consulta|evidencia|nota)\]([\s\S]*?)\[\/!\1\]/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(markdown))) {
    if (match.index > cursor) {
      segments.push({ type: "markdown", content: markdown.slice(cursor, match.index) });
    }

    segments.push({
      type: "callout",
      variant: match[1] as "consulta" | "evidencia" | "nota",
      content: match[2].trim()
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < markdown.length) {
    segments.push({ type: "markdown", content: markdown.slice(cursor) });
  }

  return segments.filter((segment) => segment.content.trim());
}

const markdownComponents: Components = {
  h1({ children }) {
    const text = textFromChildren(children);
    return (
      <h2 id={slugifyHeading(text)} className="article-internal-title">
        {children}
      </h2>
    );
  },
  h2({ children }) {
    const text = textFromChildren(children);
    return (
      <h2 id={slugifyHeading(text)}>
        {children}
      </h2>
    );
  },
  h3({ children }) {
    const text = textFromChildren(children);
    return (
      <h3 id={slugifyHeading(text)}>
        {children}
      </h3>
    );
  },
  p({ children }) {
    return <p>{children}</p>;
  },
  ul({ children }) {
    return <ul>{children}</ul>;
  },
  ol({ children }) {
    return <ol>{children}</ol>;
  },
  li({ children }) {
    return <li>{children}</li>;
  },
  blockquote({ children }) {
    return <blockquote>{children}</blockquote>;
  },
  strong({ children }) {
    return <strong>{children}</strong>;
  },
  em({ children }) {
    return <em>{children}</em>;
  },
  a({ children, href }) {
    return (
      <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
  hr() {
    return <hr />;
  },
  img({ src, alt }) {
    if (!src || typeof src !== "string") return null;

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? ""} />;
  }
};

function MarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}

export function ArticleMarkdown({ content }: { content: string }) {
  const segments = splitCallouts(content);

  return (
    <div>
      {segments.map((segment, index) => {
        if (segment.type === "markdown") {
          return <MarkdownBlock key={`${segment.type}-${index}`} content={segment.content} />;
        }

        return (
          <aside key={`${segment.type}-${index}`} className={`article-callout ${segment.variant}`}>
            <p className="article-callout-title">{calloutLabels[segment.variant]}</p>
            <div>
              <MarkdownBlock content={segment.content} />
            </div>
          </aside>
        );
      })}
    </div>
  );
}
