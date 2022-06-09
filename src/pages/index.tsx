import { GetStaticProps } from 'next';
import { useState } from 'react';
import NextPageButton from '../components/NextPageButton';
import Post from '../components/Post';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({
  postsPagination: { next_page, results },
}: HomeProps) {
  const [posts, setPosts] = useState(results);
  const [nextPage, setNextPage] = useState(next_page);
  const [isLoading, setIsloading] = useState(false);

  function loadPosts() {
    setIsloading(true);
    const fetchPosts = async () => {
      const response = await fetch(next_page);
      const responseJson = await response.json();

      const posts: Post[] = responseJson.results.map(p => ({
        uid: p.uid,
        first_publication_date: p.first_publication_date,
        data: {
          title: p.data.title,
          subtitle: p.data.subtitle,
          author: p.data.author,
        },
      }));

      setPosts(prevPosts => [...prevPosts, ...posts]);
      setNextPage(responseJson.next_page);
      setIsloading(false);
    };

    fetchPosts();
  }

  return (
    <div className={commonStyles.container}>
      <section>
        {posts.map(post => (
          <article key={post.uid}>
            <Post post={post} />
          </article>
        ))}
      </section>
      {nextPage && <NextPageButton fetchPosts={loadPosts} />}
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

  const posts: Post[] = postsResponse.results.map(p => ({
    uid: p.uid,
    first_publication_date: p.first_publication_date,
    data: {
      title: p.data.title,
      subtitle: p.data.subtitle,
      author: p.data.author,
    },
  }));

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
