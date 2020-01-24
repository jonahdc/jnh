import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import moment from 'moment'

const PostCard = ({ post, showExcerpt = false }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.published_at && <div>{moment(post.published_at).format('DDD MMM YYYY')}</div>}
                {post.feature_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div>}
                {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div>}
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            {showExcerpt && <section className="post-card-excerpt">{post.excerpt}</section>}
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div>{readingTime}</div>
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    showExcerpt: PropTypes.bool,
    post: PropTypes.shape({
        published_at: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
