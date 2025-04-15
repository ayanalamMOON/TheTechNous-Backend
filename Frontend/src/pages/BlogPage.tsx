import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';

// Types for our blog data
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  url: string;
  createdAt?: string;
  tags?: string[];
  imageUrl?: string;
}

// Sample blog post data (hardcoded for demo)
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends in 2025",
    content: "The web development landscape continues to evolve at a rapid pace. New frameworks, tools, and methodologies are emerging to meet the growing demands of modern applications. In this article, we explore the most promising trends that are shaping the future of web development in 2025.",
    author: "Alex Johnson",
    url: "/blog/1",
    createdAt: "2025-04-10",
    tags: ["Web Development", "Technology", "Frontend"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Building Scalable Backend Solutions with Modern Architectures",
    content: "Scalability is no longer a luxury but a necessity for modern applications. As user bases grow and traffic increases, your backend needs to scale accordingly. This comprehensive guide explores various architectural patterns and best practices for building highly scalable backend systems.",
    author: "Sarah Chen",
    url: "/blog/2",
    createdAt: "2025-04-05",
    tags: ["Backend", "Architecture", "Scalability"],
    imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
  },
  {
    id: 3,
    title: "Machine Learning in Everyday Applications: Practical Examples",
    content: "Machine learning has moved beyond academic research and into practical everyday applications. From personalized recommendations to predictive text, ML is transforming user experiences across various domains. Discover how machine learning algorithms are being implemented in applications you use daily.",
    author: "Michael Rahman",
    url: "/blog/3",
    createdAt: "2025-03-28",
    tags: ["Machine Learning", "AI", "Data Science"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Security Best Practices for Modern Web Applications",
    content: "With cyber threats becoming increasingly sophisticated, security cannot be an afterthought in web development. Learn about the essential security measures, from authentication and authorization to data encryption and secure coding practices, that every modern web application should implement.",
    author: "Emily Torres",
    url: "/blog/4",
    createdAt: "2025-03-21",
    tags: ["Security", "Web Development", "Best Practices"],
    imageUrl: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    title: "The Rise of Decentralized Applications (dApps)",
    content: "Blockchain technology has enabled a new class of applications that operate without central authority. These decentralized applications (dApps) promise enhanced security, transparency, and user autonomy. Explore how dApps are disrupting traditional models and creating new possibilities.",
    author: "David Kim",
    url: "/blog/5",
    createdAt: "2025-03-15",
    tags: ["Blockchain", "dApps", "Decentralization"],
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
  },
  {
    id: 6,
    title: "Optimizing Performance in React Applications",
    content: "React has become the go-to library for building modern user interfaces. However, as applications grow in complexity, performance optimization becomes crucial. This guide covers advanced techniques for improving React application performance, from code splitting to memoization.",
    author: "Sophia Martinez",
    url: "/blog/6",
    createdAt: "2025-03-08",
    tags: ["React", "Performance", "Frontend"],
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.1,
      duration: 0.5, 
      ease: "easeOut" 
    } 
  })
};

// Styled Components
const PageContainer = styled.div`
  padding: 120px 0 60px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary);
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
`;

const SearchContainer = styled(motion.div)`
  margin: 2rem auto 4rem;
  max-width: 600px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid var(--border);
  border-radius: 50px;
  background-color: var(--background);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border: 1px solid var(--border);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-md);
  }
`;

const BlogCardImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const BlogCardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
`;

const BlogCardExcerpt = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogCardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  --primary-rgb: 67, 97, 238;
`;

const ReadMoreLink = styled(Link)`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  grid-column: 1 / -1;
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const EmptyStateDescription = styled.p`
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
`;

const Pagination = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 4rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.active ? 'var(--primary)' : 'var(--background)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  transition: var(--transition);
  
  &:hover:not([disabled]) {
    background-color: ${props => props.active ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.1)'};
    border-color: var(--primary);
    color: ${props => props.active ? 'white' : 'var(--primary)'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(samplePosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Filter posts based on search term
  useEffect(() => {
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredPosts(results);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, posts]);
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Format date from ISO string
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Truncate text function
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <PageContainer>
      <div className="container">
        <PageHeader>
          <PageTitle
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
          >
            The <span>Tech</span>Nous Blog
          </PageTitle>
          
          <PageDescription
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
          >
            Explore the latest insights, tutorials, and thought leadership 
            in technology, development, and design.
          </PageDescription>
          
          <SearchContainer
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeIn}
          >
            <SearchInput 
              type="text" 
              placeholder="Search for articles, topics, or authors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon><FiSearch /></SearchIcon>
          </SearchContainer>
        </PageHeader>
        
        <BlogGrid>
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                initial="hidden"
                animate="visible"
                custom={index}
                variants={fadeIn}
              >
                {post.imageUrl && (
                  <BlogCardImage imageUrl={post.imageUrl} />
                )}
                
                <BlogCardContent>
                  <BlogCardTitle>{post.title}</BlogCardTitle>
                  
                  <BlogCardMeta>
                    <MetaItem>
                      <FiUser /> {post.author}
                    </MetaItem>
                    
                    {post.createdAt && (
                      <MetaItem>
                        <FiClock /> {formatDate(post.createdAt)}
                      </MetaItem>
                    )}
                  </BlogCardMeta>
                  
                  {post.tags && post.tags.length > 0 && (
                    <TagsContainer>
                      {post.tags.map((tag, i) => (
                        <Tag key={i}>{tag}</Tag>
                      ))}
                    </TagsContainer>
                  )}
                  
                  <BlogCardExcerpt>
                    {truncateText(post.content)}
                  </BlogCardExcerpt>
                  
                  <ReadMoreLink to={post.url}>
                    Read More <FiArrowRight />
                  </ReadMoreLink>
                </BlogCardContent>
              </BlogCard>
            ))
          ) : (
            <EmptyState>
              <EmptyStateTitle>No matching posts found</EmptyStateTitle>
              <EmptyStateDescription>
                Try adjusting your search term or explore other topics.
              </EmptyStateDescription>
            </EmptyState>
          )}
        </BlogGrid>
        
        {filteredPosts.length > postsPerPage && (
          <Pagination
            initial="hidden"
            animate="visible"
            custom={5}
            variants={fadeIn}
          >
            <PageButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              &lt;
            </PageButton>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton
                key={i}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </PageButton>
            ))}
            
            <PageButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              &gt;
            </PageButton>
          </Pagination>
        )}
      </div>
    </PageContainer>
  );
};

export default BlogPage;