import React, { useState } from 'react';

interface LoginProps {
  onNavigateToOnboarding: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateToOnboarding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, autoLogin });
  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Drifting circles with gentle movement */}
        <div className="absolute top-32 left-8 w-24 h-24 bg-orange-200 rounded-full opacity-8 animate-drift"></div>
        <div className="absolute top-16 right-16 w-20 h-20 bg-orange-300 rounded-full opacity-10 animate-drift-reverse"></div>
        <div className="absolute bottom-24 left-24 w-16 h-16 bg-orange-400 rounded-full opacity-12 animate-drift"></div>
        <div className="absolute bottom-40 right-12 w-18 h-18 bg-orange-200 rounded-full opacity-8 animate-drift-reverse"></div>

        {/* Additional drifting elements */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-6 animate-drift"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full opacity-8 animate-drift-reverse"></div>
        <div className="absolute top-1/2 left-10 w-14 h-14 bg-orange-300 rounded-full opacity-10 animate-drift"></div>
        <div className="absolute top-3/4 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-8 animate-drift-reverse"></div>

        {/* Extra floating circles */}
        <div className="absolute top-2/3 left-1/3 w-20 h-20 bg-orange-200 rounded-full opacity-7 animate-drift"></div>
        <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-orange-300 rounded-full opacity-9 animate-drift-reverse"></div>
        <div className="absolute bottom-1/2 left-20 w-22 h-22 bg-orange-400 rounded-full opacity-8 animate-drift"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full py-6 z-50">
        <div className="w-full px-16 flex justify-between items-center">
          <span className="text-orange-500 text-lg font-medium font-jua">우동 - 우리들의 동아리</span>
          <button
            onClick={onNavigateToOnboarding}
            className="text-2xl hover:text-orange-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-orange-100 active:scale-95"
            title="홈으로 가기"
          >
            🏠
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex items-center relative z-20">
        {/* Left Side - Login Form */}
        <div className="w-1/2 pl-16 pr-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-700 mb-1 font-jua leading-tight">
              동아리관리 플랫폼에
            </h1>
            <h2 className="text-3xl font-semibold mb-4 font-jua">
              <span className="text-orange-500">로그인</span> 하세요
            </h2>
            <p className="text-gray-600 text-base font-gowun">
              이메일과 비밀번호로 간편하게 로그인하고 동아리 활동을 시작해보세요
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* Auto Login & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-600 font-gowun">자동 로그인</span>
              </label>
              <a href="#" className="text-orange-400 hover:text-orange-500 font-gowun">
                비밀번호 찾기
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-2xl transition-colors border border-orange-400 font-gowun text-base"
            >
              로그인
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-[#fcf9f5] text-gray-400 text-base font-gowun">또는</span>
              </div>
            </div>

            {/* Sign up button */}
            <div className="text-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-2xl font-medium border border-orange-400 transition-colors font-gowun text-sm">
                회원가입
              </button>
            </div>

            
          </form>

        </div>

        {/* Right Side - Mascot */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="relative">
            <img
              src="/images/udonMascot.png"
              alt="우동 마스코트"
              className="w-72 h-auto object-contain animate-mascot-wiggle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;