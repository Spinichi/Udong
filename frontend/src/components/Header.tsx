import React from 'react';

interface HeaderProps {
  onNavigateToOnboarding: () => void;
  variant?: 'default' | 'onboarding';
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigateToOnboarding,
  variant = 'default',
  onLoginClick
}) => {
  if (variant === 'onboarding') {
    return (
      <header className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={onNavigateToOnboarding}
            className="text-orange-500 text-lg font-medium font-jua hover:text-orange-600 transition-colors cursor-pointer"
            title="홈으로 가기"
          >
            우동 - 우리들의 동아리
          </button>
          <button
            onClick={onLoginClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium font-gowun transition-colors"
          >
            로그인
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 w-full py-6 z-50">
      <div className="w-full px-16 flex justify-between items-center">
        <button
          onClick={onNavigateToOnboarding}
          className="text-orange-500 text-lg font-medium font-jua hover:text-orange-600 transition-colors cursor-pointer"
          title="홈으로 가기"
        >
          우동 - 우리들의 동아리
        </button>
        <button
          onClick={onNavigateToOnboarding}
          className="text-2xl hover:text-orange-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-orange-100 active:scale-95"
          title="홈으로 가기"
        >
          🏠
        </button>
      </div>
    </header>
  );
};

export default Header;