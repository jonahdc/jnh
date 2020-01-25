import { graphql } from 'gatsby';
import React from 'react';
import { Layout, Pagination, PostCard } from '../components/common';
import { MetaData } from '../components/common/meta';

interface IndexProps {
    data: {
        allGhostPost: object;
    };
    location: {
        pathname: string;
    };
    pageContext: object;
}

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
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

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allGhostPost(sort: { order: DESC, fields: [published_at] }, limit: $limit, skip: $skip) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
