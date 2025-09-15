import React from 'react';
import Header from '../components/Header';

interface ClubSelectionProps {
  onNavigateToOnboarding: () => void;
  onNavigateToJoinClub?: () => void;
  onNavigateToCreateClub?: () => void;
}

const ClubSelection: React.FC<ClubSelectionProps> = ({
  onNavigateToOnboarding,
  onNavigateToJoinClub,
  onNavigateToCreateClub
}) => {
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

      <Header onNavigateToOnboarding={onNavigateToOnboarding} />

      {/* Title Section */}
      <div className="absolute top-32 left-16 z-30">
        <h1 className="text-3xl font-semibold mb-4 font-jua leading-relaxed">
          <span className="text-orange-500">동아리를&nbsp;</span>선택해주세요
        </h1>
        <p className="text-gray-600 text-base font-gowun">
          새로운 동아리를 만들거나 기존 동아리에 참가할 수 있습니다
        </p>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center relative z-20">
        {/* Left Side - Mascot */}
        <div className="w-1/2 flex items-center justify-center pl-16">
          <div className="relative mt-32">
            <img
              src="/images/clubSelect.png"
              alt="우동 마스코트"
              className="w-72 h-auto object-contain animate-mascot-wiggle"
            />
          </div>
        </div>

        {/* Right Side - Club Options */}
        <div className="w-1/2 pr-16 pl-8">

          {/* Club Options */}
          <div className="space-y-6 max-w-lg">
            {/* Join Club Option */}
            <div className="bg-white border-2 border-orange-200 rounded-3xl p-8 hover:border-orange-300 transition-colors cursor-pointer group"
                 onClick={onNavigateToJoinClub}>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 font-jua">동아리 참가하기</h3>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600 font-gowun">
                  <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                  가입 신청
                </div>
                <div className="flex items-center text-sm text-gray-600 font-gowun">
                  <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                  즉시 활동참여
                </div>
                <div className="flex items-center text-sm text-gray-600 font-gowun">
                  <span className="w-2 h-2 bg-orange-300 rounded-full mr-3"></span>
                  활동 포인트에 따른 혜택
                </div>
              </div>

              <p className="text-gray-500 text-sm font-gowun leading-relaxed mb-6">
                기존 동아리에 참가하여 다양한 활동에 참여해보세요!
              </p>

              <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 px-4 rounded-xl transition-colors border border-orange-200 font-gowun text-base group-hover:bg-orange-200">
                동아리 찾기
              </button>
            </div>

            {/* Create Club Option */}
            <div className="bg-orange-500 border-2 border-orange-400 rounded-3xl p-8 hover:bg-orange-600 transition-colors cursor-pointer group text-white"
                 onClick={onNavigateToCreateClub}>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold font-jua">동아리 생성하기</h3>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-orange-100 font-gowun">
                  <span className="w-2 h-2 bg-orange-200 rounded-full mr-3"></span>
                  동아리만의 특별한 마스코트 생성
                </div>
                <div className="flex items-center text-sm text-orange-100 font-gowun">
                  <span className="w-2 h-2 bg-orange-200 rounded-full mr-3"></span>
                  편리한 동아리 관리
                </div>
                <div className="flex items-center text-sm text-orange-100 font-gowun">
                  <span className="w-2 h-2 bg-orange-200 rounded-full mr-3"></span>
                  관리자 권한
                </div>
              </div>

              <p className="text-orange-100 text-sm font-gowun leading-relaxed mb-6">
                새로운 동아리를 만들고 리더가 되어 멤버들을 관리해보세요!
              </p>

              <button className="w-full bg-orange-400 hover:bg-orange-300 text-white font-medium py-3 px-4 rounded-xl transition-colors border border-orange-300 font-gowun text-base group-hover:bg-orange-300">
                동아리 생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSelection;