import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
// import config from '../../utils/siteConfig'
// Styles
import '../../styles/app.css';

interface DefaultLayoutProps {
    children: any;
    bodyClass: string;
    isHome: boolean;
    data: {
        file: {
            childImageSharp?: any;
        };
        allGhostSettings: any;
    };
}

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout: React.SFC<DefaultLayoutProps> = ({ data, children, bodyClass, isHome }) => {
    useEffect(() => {
        // call the highlightAll() function to style our code blocks
        Prism.highlightAll();
    });

    const site = data.allGhostSettings.edges[0].node;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ? (
                                            <img
                                                className="site-logo"
                                                src={site.logo}
                                                alt={site.title}
                                            />
                                        ) : (
                                            <Img
                                                fixed={data.file.childImageSharp.fixed}
                                                alt={site.title}
                                            />
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2020 &mdash; Published with{' '}
                                <a
                                    className="site-foot-nav-item"
                                    href="https://ghost.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ghost
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
