import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';

interface PagProps {
    data: {
        ghostPage: {
            codeinjection_styles: object;
            title: string;
            html: string;
            feature_image: string;
        };
    };
    location: object;
}

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
    const page = data.ghostPage;

    return (
        <>
            <MetaData data={data} location={location} type="website" />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">{page.title}</h1>

                        {/* The main page content */}
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </article>
                </div>
            </Layout>
        </>
    );
};

export default Page;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`;
