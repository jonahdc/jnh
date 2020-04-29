import { readingTime as readingTimeHelper } from '@tryghost/helpers';
import { Tags } from '@tryghost/helpers-gatsby';
import { Link } from 'gatsby';
import moment from 'moment';
import React from 'react';
import styles from './PostCard.module.css';

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

    const date = moment(post.published_at).format('DD');
    const month = moment(post.published_at).format('MMM');
    const year = moment(post.published_at).format('YYYY');
    return (
        <Link to={url} className={styles.postCard}>
            <header className={styles.postCardHeader}>
                <div>
                    <div className={styles.postCardHeaderMeta}>
                        {post.published_at && (
                            <div className={styles.postCardDate}>
                                {date} {month} {year}
                            </div>
                        )}
                        {post.tags && post.tags.length > 0 && (
                            <div className={styles.postCardTags}>
                                <Tags post={post} visibility="public" autolink={false} />
                            </div>
                        )}
                    </div>
                    <div className={styles.postCardBody}>
                        <div className={styles.postCardTitleSection}>
                            {post.feature_image && (
                                <div
                                    className="post-card-image"
                                    style={{
                                        backgroundImage: `url(${post.feature_image})`,
                                    }}
                                ></div>
                            )}
                            {post.featured && <span>Featured</span>}
                            <h2>{post.title}</h2>
                            <div>
                                <div>{readingTime}</div>
                            </div>{' '}
                        </div>
                        {true && (
                            <section className={styles.postCardExcerpt}>{post.excerpt}</section>
                        )}
                    </div>
                </div>
            </header>
        </Link>
    );
};

export default PostCard;
