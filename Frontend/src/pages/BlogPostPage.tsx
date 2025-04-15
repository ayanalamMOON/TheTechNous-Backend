import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiClock, FiShare2, FiHeart, FiMessageCircle, FiArrowLeft, FiBookmark } from 'react-icons/fi';

// Types
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  comments: Comment[];
  relatedPosts: RelatedPost[];
}

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

interface RelatedPost {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

// Sample blog post data (hardcoded for demo)
const sampleBlogPost: BlogPost = {
  id: 1,
  title: "The Future of Web Development: Trends in 2025",
  content: `
  <p>The web development landscape continues to evolve at a rapid pace. New frameworks, tools, and methodologies are emerging to meet the growing demands of modern applications. In this article, we explore the most promising trends that are shaping the future of web development in 2025.</p>
  
  <h2>1. WebAssembly Goes Mainstream</h2>
  <p>WebAssembly (Wasm) is becoming the standard for high-performance web applications. It allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. In 2025, we're seeing widespread adoption across industries, from gaming to data visualization.</p>
  <p>Key developments include:</p>
  <ul>
    <li>Broader language support, including first-class Python and Java compilation</li>
    <li>Improved debugging tools integrated directly into browsers</li>
    <li>Standardized component model enabling seamless interoperability</li>
  </ul>
  
  <h2>2. AI-Assisted Development</h2>
  <p>Artificial Intelligence is revolutionizing how we write and maintain code. Advanced code completion tools now understand context and intent, dramatically increasing developer productivity.</p>
  <p>Modern AI assistants can:</p>
  <ul>
    <li>Generate entire components based on natural language descriptions</li>
    <li>Detect potential bugs and security vulnerabilities before deployment</li>
    <li>Optimize application performance by analyzing usage patterns</li>
  </ul>
  
  <h2>3. Edge Computing Integration</h2>
  <p>Edge computing has moved from buzzword to essential infrastructure. Applications now distribute processing between client devices, CDN edges, and central servers to minimize latency and maximize responsiveness.</p>
  <p>This paradigm shift requires new approaches to:</p>
  <ul>
    <li>State management across distributed systems</li>
    <li>Security and data privacy at the edge</li>
    <li>Developer tooling for debugging distributed applications</li>
  </ul>
  
  <h2>4. The Rise of Web Components</h2>
  <p>Web Components have finally reached their potential, providing truly reusable, framework-agnostic UI elements. The component ecosystem has matured, with robust libraries addressing common needs while maintaining excellent performance.</p>
  
  <h2>5. Accessibility as a Core Requirement</h2>
  <p>Web accessibility is no longer an afterthought but a fundamental aspect of development. Automated tools now integrate with CI/CD pipelines to enforce accessibility standards, and browsers provide better built-in support for assistive technologies.</p>
  
  <h2>Conclusion</h2>
  <p>The web development landscape of 2025 emphasizes performance, intelligence, and inclusivity. Successful developers will embrace these trends while focusing on creating fast, accessible experiences that work seamlessly across devices and platforms.</p>
  `,
  author: "Alex Johnson",
  createdAt: "2025-04-10",
  tags: ["Web Development", "Technology", "Frontend"],
  imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  likes: 127,
  comments: [
    {
      id: 1,
      author: "Sarah Chen",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Great article! I'm particularly interested in the AI-assisted development tools. Do you have any recommendations for current tools that are heading in this direction?",
      createdAt: "2025-04-11",
      likes: 8,
      replies: [
        {
          id: 2,
          author: "Alex Johnson",
          authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          content: "Thanks Sarah! GitHub Copilot and JetBrains AI Assistant are leading the way right now. Both are continuously improving and heading toward the capabilities I described.",
          createdAt: "2025-04-11",
          likes: 3
        }
      ]
    },
    {
      id: 3,
      author: "Michael Rahman",
      authorAvatar: "https://randomuser.me/api/portraits/men/51.jpg",
      content: "WebAssembly has been 'going mainstream' for years now. I'm skeptical it will ever truly replace JavaScript for most web applications. The tooling and debugging experience is still miles behind.",
      createdAt: "2025-04-12",
      likes: 5
    },
    {
      id: 4,
      author: "Emily Torres",
      authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
      content: "The point about accessibility is so important! It's great to see it getting more attention. I think the legal requirements in many countries are finally pushing companies to take it seriously.",
      createdAt: "2025-04-13",
      likes: 12
    }
  ],
  relatedPosts: [
    {
      id: 2,
      title: "Building Scalable Backend Solutions with Modern Architectures",
      imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      url: "/blog/2"
    },
    {
      id: 6,
      title: "Optimizing Performance in React Applications",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      url: "/blog/6"
    },
    {
      id: 4,
      title: "Security Best Practices for Modern Web Applications",
      imageUrl: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      url: "/blog/4"
    }
  ]
};

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

// Styled components
const PageContainer = styled.div`
  padding: 120px 0 60px;
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const PostTitle = styled(motion.h1)`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PostMeta = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  --primary-rgb: 67, 97, 238;
`;

const PostImageContainer = styled(motion.div)`
  margin-bottom: 2.5rem;
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 21/9;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PostContent = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-primary);
  
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin: 1.8rem 0 0.8rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: var(--primary);
    text-decoration: underline;
  }
`;

const PostActions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-primary)'};
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  svg {
    font-size: 1rem;
  }
  
  &:before {
    content: '';
    --primary-rgb: 67, 97, 238;
  }
`;

const CommentSection = styled(motion.div)`
  margin-top: 4rem;
`;

const CommentCount = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentCard = styled.div`
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 500;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const CommentContent = styled.p`
  margin-bottom: 1rem;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CommentActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.3rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const ReplySection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  padding-left: 1.5rem;
`;

const CommentForm = styled.form`
  margin-top: 2rem;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 120px;
  margin-bottom: 1rem;
  resize: vertical;
  font-family: var(--font-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
`;

const SidebarSection = styled(motion.div)`
  position: sticky;
  top: 100px;
  
  @media (max-width: 992px) {
    position: static;
  }
`;

const SidebarCard = styled.div`
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--primary);
  }
`;

const AuthorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LargeAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const AuthorName2 = styled.h4`
  margin-bottom: 0.5rem;
`;

const AuthorBio = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const AuthorSocial = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
  
  &:before {
    content: '';
    --primary-rgb: 67, 97, 238;
  }
`;

const RelatedPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const RelatedPostItem = styled(Link)`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  
  &:hover h4 {
    color: var(--primary);
  }
`;

const RelatedPostImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--border-radius);
`;

const RelatedPostTitle = styled.h4`
  font-size: 0.95rem;
  transition: var(--transition);
`;

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  
  // Simulate fetching a blog post
  useEffect(() => {
    // In a real app, fetch from API using id
    setLoading(true);
    
    // Simulating API fetch delay
    setTimeout(() => {
      setPost(sampleBlogPost);
      setLoading(false);
    }, 300);
  }, [id]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API
    alert('Comment feature will be implemented soon!');
    setComment('');
  };
  
  if (loading) {
    return (
      <div className="container" style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>Loading post...</div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container" style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>Post not found</div>
      </div>
    );
  }
  
  return (
    <PageContainer>
      <div className="container">
        <PostHeader>
          <BackLink to="/blog">
            <FiArrowLeft /> Back to all posts
          </BackLink>
          
          <PostTitle
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeIn}
          >
            {post.title}
          </PostTitle>
          
          <PostMeta
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeIn}
          >
            <MetaItem>
              <FiUser /> {post.author}
            </MetaItem>
            
            <MetaItem>
              <FiClock /> {formatDate(post.createdAt)}
            </MetaItem>
            
            <MetaItem>
              <FiMessageCircle /> {post.comments.length} Comments
            </MetaItem>
          </PostMeta>
          
          <TagsContainer>
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        </PostHeader>
        
        <PostImageContainer
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeIn}
        >
          <PostImage src={post.imageUrl} alt={post.title} />
        </PostImageContainer>
        
        <PostGrid>
          <div>
            <PostContent
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeIn}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <PostActions
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeIn}
            >
              <ActionButton 
                active={liked} 
                onClick={() => setLiked(!liked)}
                aria-label={liked ? 'Unlike post' : 'Like post'}
              >
                <FiHeart /> {liked ? 'Liked' : 'Like'} ({post.likes + (liked ? 1 : 0)})
              </ActionButton>
              
              <ActionButton 
                onClick={() => window.navigator.share?.({ 
                  title: post.title,
                  text: `Check out this article: ${post.title}`,
                  url: window.location.href
                })}
                aria-label="Share post"
              >
                <FiShare2 /> Share
              </ActionButton>
              
              <ActionButton 
                active={bookmarked} 
                onClick={() => setBookmarked(!bookmarked)}
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
              >
                <FiBookmark /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </ActionButton>
            </PostActions>
            
            <CommentSection
              initial="hidden"
              animate="visible"
              custom={5}
              variants={fadeIn}
            >
              <CommentCount>{post.comments.length} Comments</CommentCount>
              
              <CommentForm onSubmit={handleSubmitComment}>
                <CommentTextarea 
                  placeholder="Write your comment..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <SubmitButton type="submit">Post Comment</SubmitButton>
              </CommentForm>
              
              <CommentList>
                {post.comments.map((comment) => (
                  <CommentCard key={comment.id}>
                    <CommentHeader>
                      <CommentAuthor>
                        <AuthorAvatar src={comment.authorAvatar} alt={comment.author} />
                        <AuthorInfo>
                          <AuthorName>{comment.author}</AuthorName>
                          <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
                        </AuthorInfo>
                      </CommentAuthor>
                    </CommentHeader>
                    
                    <CommentContent>{comment.content}</CommentContent>
                    
                    <CommentActions>
                      <CommentActionButton>
                        <FiHeart /> {comment.likes}
                      </CommentActionButton>
                      
                      <CommentActionButton>
                        <FiMessageCircle /> Reply
                      </CommentActionButton>
                    </CommentActions>
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <ReplySection>
                        {comment.replies.map((reply) => (
                          <CommentCard key={reply.id}>
                            <CommentHeader>
                              <CommentAuthor>
                                <AuthorAvatar src={reply.authorAvatar} alt={reply.author} />
                                <AuthorInfo>
                                  <AuthorName>{reply.author}</AuthorName>
                                  <CommentDate>{formatDate(reply.createdAt)}</CommentDate>
                                </AuthorInfo>
                              </CommentAuthor>
                            </CommentHeader>
                            
                            <CommentContent>{reply.content}</CommentContent>
                            
                            <CommentActions>
                              <CommentActionButton>
                                <FiHeart /> {reply.likes}
                              </CommentActionButton>
                            </CommentActions>
                          </CommentCard>
                        ))}
                      </ReplySection>
                    )}
                  </CommentCard>
                ))}
              </CommentList>
            </CommentSection>
          </div>
          
          <SidebarSection
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeIn}
          >
            <SidebarCard>
              <SidebarTitle>About the Author</SidebarTitle>
              <AuthorCard>
                <LargeAvatar src="https://randomuser.me/api/portraits/men/32.jpg" alt={post.author} />
                <AuthorName2>{post.author}</AuthorName2>
                <AuthorBio>
                  Senior Developer and Tech Writer with over 10 years of experience in web technologies and cloud architecture.
                </AuthorBio>
                <AuthorSocial>
                  <SocialIcon href="#" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </SocialIcon>
                  <SocialIcon href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </SocialIcon>
                  <SocialIcon href="#" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </SocialIcon>
                </AuthorSocial>
              </AuthorCard>
            </SidebarCard>
            
            <SidebarCard>
              <SidebarTitle>Related Posts</SidebarTitle>
              <RelatedPostsList>
                {post.relatedPosts.map((relatedPost) => (
                  <RelatedPostItem key={relatedPost.id} to={relatedPost.url}>
                    <RelatedPostImage src={relatedPost.imageUrl} alt={relatedPost.title} />
                    <RelatedPostTitle>{relatedPost.title}</RelatedPostTitle>
                  </RelatedPostItem>
                ))}
              </RelatedPostsList>
            </SidebarCard>
            
            <SidebarCard>
              <SidebarTitle>Tags</SidebarTitle>
              <TagsContainer>
                {post.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </SidebarCard>
          </SidebarSection>
        </PostGrid>
      </div>
    </PageContainer>
  );
};

export default BlogPostPage;