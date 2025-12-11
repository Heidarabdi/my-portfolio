import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
    const blog = await getCollection('blog');

    // Sort by date, newest first
    const sortedBlog = blog.sort((a, b) => {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });

    return rss({
        title: 'Heidar Dev Blog',
        description: 'Insights on Machine Learning, Web Development, and IT Operations',
        site: site?.toString() || 'https://heidarabdi.dev',
        items: sortedBlog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt,
            link: `/blog/${post.slug}/`,
            categories: [post.data.category],
            author: post.data.author,
        })),
        customData: `<language>en-us</language>`,
    });
};
