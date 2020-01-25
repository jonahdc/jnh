import { graphql, StaticQuery } from 'gatsby';
import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import config from '../../../utils/siteConfig';
import getAuthorProperties from './getAuthorProperties';
import ImageMeta from './ImageMeta';

interface AuthorMetaProps {
    data: {
        name: string;
        bio: string;
        profile_image: string;
        website: string;
        twitter: string;
        facebook: string;
    };
    settings: {
        title: string;
        twitter: string;
        description: string;
        allGhostSettings: object;
    };
    canonical: string;
}

const AuthorMeta = ({ data, settings, canonical }) => {
    settings = settings.allGhostSettings.edges[0].node;

    const author = getAuthorProperties(data);
    const shareImage = author.image || _.get(settings, `cover_image`, null);
    const title = `${data.name} - ${settings.title}`;
    const description = data.bio || config.siteDescriptionMeta || settings.description;

    const jsonLd = {
        '@context': `https://schema.org/`,
        '@type': `Person`,
        name: data.name,
        sameAs: author.sameAsArray ? author.sameAsArray : undefined,
        url: canonical,
        image: shareImage
            ? {
                  '@type': `ImageObject`,
                  url: shareImage,
                  width: config.shareImageWidth,
                  height: config.shareImageHeight,
              }
            : undefined,
        mainEntityOfPage: {
            '@type': `WebPage`,
            '@id': config.siteUrl,
        },
        description,
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={settings.title} />
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonical} />
                {settings.twitter && (
                    <meta
                        name="twitter:site"
                        content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`}
                    />
                )}
                {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    );
};

const AuthorMetaQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettingsAuthorMeta {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <AuthorMeta settings={data} {...props} />}
    />
);

export default AuthorMetaQuery;
