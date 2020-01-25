import { graphql } from 'gatsby';
import React from 'react';
import { Layout, Pagination, PostCard } from '../components/common';
import { MetaData } from '../components/common/meta';

interface TagProps {
    data: {
        ghostTag: {
            name: string;
            description: string;
        };
        allGhostPost: object;
    };
    location: {
        pathname: string;
    };
    pageContext: object;
}

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag;
    const posts = data.allGhostPost.edges;

    return (
        <>
            <MetaData data={data} location={location} type="series" />
            <Layout>
                <div className="container">
                    <header className="tag-header">
                        <h1>{tag.name}</h1>
                        {tag.description ? <p>{tag.description}</p> : null}
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

export default Tag;

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
