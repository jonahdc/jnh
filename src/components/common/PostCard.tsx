import { readingTime as readingTimeHelper } from '@tryghost/helpers';
import { Tags } from '@tryghost/helpers-gatsby';
import { Link } from 'gatsby';
import moment from 'moment';
import React from 'react';

interface PostCardProps {
    showExcerpt: boolean;
    post: {
        html: string;
        published_at: string;
        slug: string;
        title: string;
        feature_image: [string];
        featured: boolean;
        tags: Record<string, string>;
        excerpt: string;
        primary_author: {
            name: string;
            profile_image: string;
        };
    };
}

const PostCard: React.SFC<PostCardProps> = ({ post, showExcerpt = false }) => {
    const url = `/${post.slug}/`;
    const readingTime = readingTimeHelper(post);

    const date = moment(post.published_at).format('DDD');
    const month = moment(post.published_at).format('MMM');
    const year = moment(post.published_at).format('YYYY');
    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.published_at && (
                    <div className="post-card-header-date">
                        <div className="date">{date}</div>
                        <div>{month}</div>
                    </div>
                )}
                <div>
                    {post.feature_image && (
                        <div
                            className="post-card-image"
                            style={{
                                backgroundImage: `url(${post.feature_image})`,
                            }}
                        ></div>
                    )}
                    {post.tags && (
                        <div className="post-card-tags">
                            {' '}
                            <Tags post={post} visibility="public" autolink={false} />
                        </div>
                    )}
                    {post.featured && <span>Featured</span>}
                    <h2 className="post-card-title">{post.title}</h2>
                </div>
            </header>
            {showExcerpt && <section className="post-card-excerpt">{post.excerpt}</section>}
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div>{readingTime}</div>
                </div>
            </footer>
        </Link>
    );
};

export default PostCard;
