import React from 'react';
import AdvancedChatWidget from '../src/components/AdvancedChatWidget';

// مثال على استخدام الدردشة لعدة عملاء مختلفين
const ClientChatExamples: React.FC = () => {
  return (
    <div>
      {/* عميل 1: شركة تقنية - أزرق */}
      <AdvancedChatWidget 
        clientId="tech-company-001"
        clientName="شركة التقنية المتقدمة"
        primaryColor="#3b82f6"
        secondaryColor="#1e40af"
        welcomeMessage="مرحباً! أنا مساعد شركة التقنية المتقدمة. كيف يمكنني مساعدتك في حلولنا التقنية؟"
        title="مساعد تقني"
        placeholder="اسأل عن خدماتنا التقنية..."
        position="bottom-right"
      />

      {/* عميل 2: عيادة طبية - أخضر */}
      <AdvancedChatWidget 
        clientId="medical-clinic-002"
        clientName="عيادة الصحة الشاملة"
        primaryColor="#10b981"
        secondaryColor="#059669"
        welcomeMessage="مرحباً بك في عيادة الصحة الشاملة! كيف يمكنني مساعدتك في حجز موعد أو الاستفسار عن خدماتنا؟"
        title="مساعد طبي"
        placeholder="اسأل عن المواعيد والخدمات الطبية..."
        position="bottom-left"
      />

      {/* عميل 3: متجر إلكتروني - بنفسجي */}
      <AdvancedChatWidget 
        clientId="ecommerce-store-003"
        clientName="متجر الأناقة"
        primaryColor="#8b5cf6"
        secondaryColor="#7c3aed"
        welcomeMessage="أهلاً وسهلاً في متجر الأناقة! أنا هنا لمساعدتك في العثور على أفضل المنتجات."
        title="مساعد المبيعات"
        placeholder="ابحث عن المنتجات أو اسأل عن الطلبات..."
        position="top-right"
      />

      {/* عميل 4: مطعم - برتقالي */}
      <AdvancedChatWidget 
        clientId="restaurant-004"
        clientName="مطعم النكهات الأصيلة"
        primaryColor="#f59e0b"
        secondaryColor="#d97706"
        welcomeMessage="مرحباً بك في مطعم النكهات الأصيلة! كيف يمكنني مساعدتك في الطلب أو الحجز؟"
        title="مساعد الطلبات"
        placeholder="اطلب الطعام أو احجز طاولة..."
        position="top-left"
      />

      {/* عميل 5: مدرسة - أزرق داكن */}
      <AdvancedChatWidget 
        clientId="school-005"
        clientName="مدرسة المستقبل التعليمية"
        primaryColor="#1e40af"
        secondaryColor="#1e3a8a"
        welcomeMessage="مرحباً بك في مدرسة المستقبل! أنا هنا لمساعدة الطلاب وأولياء الأمور."
        title="مساعد تعليمي"
        placeholder="اسأل عن البرامج التعليمية والأنشطة..."
        position="bottom-right"
      />
    </div>
  );
};

export default ClientChatExamples;

/*
تعليمات الاستخدام:

1. لكل عميل جديد، قم بتغيير:
   - clientId: معرف فريد للعميل (سيتم إرساله مع كل رسالة للـ webhook)
   - clientName: اسم الشركة/العميل
   - primaryColor & secondaryColor: ألوان العميل
   - welcomeMessage: رسالة ترحيب مخصصة
   - title: عنوان الدردشة
   - placeholder: نص المساعدة في حقل الإدخال
   - position: موضع الدردشة على الشاشة

2. معرف العميل (clientId) سيتم إرساله تلقائياً مع كل رسالة إلى n8n webhook
   حتى تتمكن من التمييز بين العملاء في نفس الـ workflow

3. كل دردشة ستكون منفصلة ولن تحفظ المحادثات السابقة
   (دردشة جديدة في كل مرة)

4. نفس الـ webhook يمكن أن يخدم جميع العملاء، فقط استخدم 
   الـ clientId للتمييز بينهم في منطق n8n

مثال على البيانات المرسلة للـ webhook:
{
  "chatId": "chat_tech-company-001_1727128800000_abc123def",
  "clientId": "tech-company-001", 
  "message": "ما هي خدماتكم؟",
  "route": "tech-company-001",
  "timestamp": 1727128800000,
  // ... باقي البيانات
}
*/