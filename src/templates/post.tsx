import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';

interface PostProps {
    data: {
        ghostPost: {
            codeinjection_styles: object | string;
            title: string;
            html: string;
            feature_image: string;
        };
    };
    location: object;
}

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                s
                <style type="text/css">{`${typeof post.codeinjection_styles === 'object' &&
                    post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.feature_image ? (
                            <figure className="post-feature-image">
                                <img src={post.feature_image} alt={post.title} />
                            </figure>
                        ) : null}
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
