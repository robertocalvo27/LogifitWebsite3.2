import React from 'react';

interface ArticleContentProps {
  content: string;
  videoSnippets?: {
    id: number;
    title: string;
    url: string;
    duration: string;
  }[];
  renderVideoSnippet?: (video: {
    id: number;
    title: string;
    url: string;
    duration: string;
  }) => React.ReactNode;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, videoSnippets = [], renderVideoSnippet }) => {
  // Dividir el contenido en secciones y procesar los videos
  const contentSections = content.split('[VIDEO]');
  
  return (
    <div className="prose prose-lg max-w-none">
      {contentSections.map((section, index) => (
        <React.Fragment key={index}>
          <div dangerouslySetInnerHTML={{ __html: section }} />
          {index < contentSections.length - 1 && videoSnippets[index] && renderVideoSnippet && (
            renderVideoSnippet(videoSnippets[index])
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ArticleContent; 