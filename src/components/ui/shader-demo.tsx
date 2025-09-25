import CSSShaderBackground from "@/components/ui/css-shader-background"

export default function ShaderDemo() {
  return (
    <div className="min-h-screen">
      {/* Example 1: Using shader background with specific section */}
      <CSSShaderBackground className="w-full py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            خلفية Shader مخصصة
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            هذه خلفية متحركة تم إنشاؤها باستخدام CSS فقط
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-white/30"
              >
                <h3 className="text-lg font-semibold mb-3">مثال {item}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  محتوى تجريبي لعرض كيفية عمل الخلفية المتحركة
                </p>
              </div>
            ))}
          </div>
        </div>
      </CSSShaderBackground>

      {/* Regular section without shader background */}
      <div className="w-full py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            قسم عادي بدون خلفية shader
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            هذا القسم لا يحتوي على خلفية متحركة لإظهار الفرق
          </p>
        </div>
      </div>
    </div>
  )
}