import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEdit, FiUsers, FiSearch, FiBell, FiStar } from 'react-icons/fi';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.2,
      duration: 0.8, 
      ease: "easeOut" 
    } 
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Styled Components
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 40%;
    height: 70%;
    background: radial-gradient(circle, rgba(var(--primary-rgb), 0.1), transparent 70%);
    border-radius: 50%;
    z-index: -1;
    --primary-rgb: 67, 97, 238;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 50%;
    height: 60%;
    background: radial-gradient(circle, rgba(var(--secondary-rgb), 0.08), transparent 70%);
    border-radius: 50%;
    z-index: -1;
    --secondary-rgb: 63, 55, 201;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const HeroHeading = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  span {
    color: var(--primary);
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: rgba(var(--primary-rgb), 0.2);
      z-index: -1;
      --primary-rgb: 67, 97, 238;
    }
  }
`;

const HeroSubheading = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 550px;
  
  @media (max-width: 992px) {
    margin: 0 auto 2.5rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 0.8rem 1.8rem;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(var(--primary-rgb), 0.3);
    color: white;
    --primary-rgb: 67, 97, 238;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 0.8rem 1.8rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    color: var(--text-primary);
  }
`;

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  
  @media (max-width: 992px) {
    order: 1;
    margin-bottom: 2rem;
  }
`;

const HeroImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background-color: rgba(var(--primary-rgb), 0.05);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  --primary-rgb: 67, 97, 238;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234361ee' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const FloatingCard1 = styled(motion.div)`
  position: absolute;
  top: -30px;
  left: 20px;
  background-color: var(--background);
  border-radius: 12px;
  padding: 15px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FloatingCard2 = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  right: 20px;
  background-color: var(--background);
  border-radius: 12px;
  padding: 15px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FloatingCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
`;

const SectionHeading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubheading = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  border: 1px solid var(--border);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: rgba(var(--primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  font-size: 1.5rem;
  --primary-rgb: 67, 97, 238;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 0;
  background-color: rgba(var(--primary-rgb), 0.03);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -15%;
    left: -5%;
    width: 20%;
    height: 30%;
    background: radial-gradient(circle, rgba(var(--primary-rgb), 0.1), transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15%;
    right: -5%;
    width: 20%;
    height: 30%;
    background: radial-gradient(circle, rgba(var(--secondary-rgb), 0.08), transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const TestimonialsContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  position: relative;
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 4rem;
    font-family: serif;
    color: rgba(var(--primary-rgb), 0.1);
    line-height: 1;
  }
`;

const TestimonialContent = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TestimonialAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 0.2rem;
`;

const TestimonialRole = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
`;

const TestimonialStars = styled.div`
  display: flex;
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const HomePage: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      content: "TheTechNous has completely transformed how I stay updated with the latest tech trends. The articles are insightful and the community is incredibly supportive.",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      initials: "SJ",
      rating: 5
    },
    {
      id: 2,
      content: "As a tech professional, I find the content on TheTechNous to be both practical and forward-thinking. It's become my go-to resource for staying ahead in the industry.",
      name: "Michael Chen",
      role: "Software Engineer",
      initials: "MC",
      rating: 5
    },
    {
      id: 3,
      content: "The depth and quality of articles on TheTechNous is outstanding. I've learned so much and have been able to apply these insights directly to my work.",
      name: "Priya Patel",
      role: "Data Scientist",
      initials: "PP",
      rating: 4
    }
  ];

  return (
    <>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <HeroText>
              <HeroHeading
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeIn}
              >
                A Modern <span>Technology</span> Blog and Knowledge Platform
              </HeroHeading>
              
              <HeroSubheading
                initial="hidden"
                animate="visible"
                custom={1}
                variants={fadeIn}
              >
                Discover the latest in technology trends, insights, and innovations. 
                Join our community of tech enthusiasts and professionals.
              </HeroSubheading>
              
              <HeroButtons
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeIn}
              >
                <PrimaryButton to="/blog">
                  Explore Blog <FiArrowRight />
                </PrimaryButton>
                
                <SecondaryButton to="/auth">
                  Join Now
                </SecondaryButton>
              </HeroButtons>
            </HeroText>
            
            <HeroImageWrapper
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeIn}
            >
              <HeroImage>
                <FloatingCard1
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                >
                  <FloatingCircle
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2
                    }}
                  >
                    <FiBell />
                  </FloatingCircle>
                  <div>
                    <strong>New Features</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Just Released</p>
                  </div>
                </FloatingCard1>
                
                <FloatingCard2
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
                >
                  <FloatingCircle
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      delay: 0.5
                    }}
                  >
                    <FiUsers />
                  </FloatingCircle>
                  <div>
                    <strong>5k+ Users</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Joined recently</p>
                  </div>
                </FloatingCard2>
              </HeroImage>
            </HeroImageWrapper>
          </HeroContent>
        </div>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionHeading>Our Core Features</SectionHeading>
          <SectionSubheading>
            TheTechNous provides a complete platform for tech enthusiasts and professionals
            to explore, learn, and share their knowledge.
          </SectionSubheading>
          
          <FeaturesGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.6 } 
                }
              }}
            >
              <FeatureIcon>
                <FiEdit />
              </FeatureIcon>
              <FeatureTitle>Blog & Articles</FeatureTitle>
              <FeatureDescription>
                Publish and share your technology insights, tutorials, and experiences with our community.
              </FeatureDescription>
              <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Learn More <FiArrowRight />
              </Link>
            </FeatureCard>
            
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.6, delay: 0.2 } 
                }
              }}
            >
              <FeatureIcon>
                <FiBell />
              </FeatureIcon>
              <FeatureTitle>Notifications</FeatureTitle>
              <FeatureDescription>
                Stay updated with the latest posts, comments, and activities from your network.
              </FeatureDescription>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Learn More <FiArrowRight />
              </Link>
            </FeatureCard>
            
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.6, delay: 0.4 } 
                }
              }}
            >
              <FeatureIcon>
                <FiSearch />
              </FeatureIcon>
              <FeatureTitle>Advanced Search</FeatureTitle>
              <FeatureDescription>
                Find exactly what you're looking for with our powerful search functionality.
              </FeatureDescription>
              <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Learn More <FiArrowRight />
              </Link>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <TestimonialsSection>
        <TestimonialsContainer className="container">
          <SectionHeading>What Our Users Say</SectionHeading>
          <SectionSubheading>
            Join thousands of tech professionals who trust TheTechNous for the latest
            insights and knowledge sharing in the technology space.
          </SectionSubheading>
          
          <TestimonialsGrid
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.6, delay: index * 0.2 } 
                  }
                }}
              >
                <TestimonialStars>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </TestimonialStars>
                <TestimonialContent>
                  {testimonial.content}
                </TestimonialContent>
                <TestimonialAuthor>
                  <TestimonialAvatar>
                    {testimonial.initials}
                  </TestimonialAvatar>
                  <TestimonialInfo>
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialRole>{testimonial.role}</TestimonialRole>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>
    </>
  );
};

export default HomePage;