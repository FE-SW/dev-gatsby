import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

interface Author {
  name: string;
  summary?: string;
}

interface Social {
  github?: string;
}

interface SiteMetadata {
  author: Author;
  social: Social;
}

interface Site {
  siteMetadata: SiteMetadata;
}

interface BioQueryData {
  site: Site;
}

const Bio: React.FC = () => {
  const data = useStaticQuery<BioQueryData>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-img.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author.name && (
        <p>
          Written by <strong>{author.name}</strong> {author.summary || null}
          {' '}
          <a href={`https://github.com/${social.github}`}>
            Here, My Github Address  
          </a>
        </p>
      )}
    </div>
  );
}

export default Bio;
