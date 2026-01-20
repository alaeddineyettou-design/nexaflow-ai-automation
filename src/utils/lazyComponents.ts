import { lazy } from 'react';

// Lazy loading للمكونات الثقيلة - يحافظ على جميع الوظائف
export const LazyAI3DAssistantShowcase = lazy(() => 
  import('../components/AI3DAssistantShowcase').then(module => ({ 
    default: module.AI3DAssistantShowcase 
  }))
);

export const LazyAIAutomationSplineDemo = lazy(() => 
  import('../components/AIAutomationSplineDemo')
);

export const LazyAIAutomationScrollShowcase = lazy(() => 
  import('../components/AIAutomationScrollShowcase')
);

export const LazyInteractiveAccordionDemo = lazy(() => 
  import('../components/InteractiveAccordionDemo')
);

export const LazyFeatures = lazy(() => 
  import('../components/Features')
);

export const LazyChatAssistant = lazy(() => 
  import('../components/ChatAssistant').then(module => ({ 
    default: module.ChatAssistant 
  }))
);