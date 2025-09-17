import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import Notification from './Notification';

interface MtPlannerProps {
  onNavigateToOnboarding: () => void;
  onNavigateToClubDashboard?: () => void;
  onNavigateToClubList?: () => void;
  onNavigateToSettlement?: () => void;
  onNavigateToChat?: () => void;
  onNavigateToVote?: () => void;
  onShowNotification?: () => void;
}

interface MtPlan {
  location: { name: string; reason: string; distance: string };
  budget: { accommodation: number; meals: number; activities: number; transportation: number; total: number };
  schedule: { time: string; activity: string; location: string }[];
  items: { essential: string[]; recommended: string[]; provided: string[] };
  accommodation: { type: string; capacity: number; rooms: string; checkIn: string; checkOut: string; facilities: string[] };
}

const MtPlanner: React.FC<MtPlannerProps> = ({
  onNavigateToOnboarding,
  onNavigateToClubDashboard,
  onNavigateToClubList,
  onNavigateToSettlement,
  onNavigateToChat,
  onNavigateToVote
}) => {
  const [mtPlan, setMtPlan] = useState<MtPlan | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Left Sidebar */}
      <Sidebar
        onNavigateToOnboarding={onNavigateToOnboarding}
        onNavigateToClubList={onNavigateToClubList}
        onNavigateToClubDashboard={onNavigateToClubDashboard}
        onNavigateToSettlement={onNavigateToSettlement}
        onNavigateToChat={onNavigateToChat}
        onNavigateToVote={onNavigateToVote}
        onShowNotification={() => setShowNotificationModal(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <div className="h-16 bg-white border-b border-orange-200 flex items-center justify-between px-6 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-gray-800">MT 계획</h1>
            <p className="text-sm text-gray-600">완벽한 MT를 위한 맞춤 계획을 세워보세요</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-auto">
          {!mtPlan ? (
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/mt.webp"
                  alt="MT 계획 배경 이미지"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">완벽한 MT 계획</h2>
                  <p className="text-xl opacity-90 drop-shadow-md">AI가 도와주는 맞춤형 MT 플래닝</p>
                </div>
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-2xl">🗺️</span>
                    <div>
                      <div className="text-sm font-semibold">AI 분석</div>
                      <div className="text-xs opacity-80">최적 장소 탐색 중...</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-12">
                <div className="text-6xl mb-6">🏕️</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">MT 계획 생성기</h2>
                <p className="text-lg text-gray-600 mb-8">
                  몇 가지 정보만 입력하면 완벽한 MT 계획을 자동으로 생성해드립니다
                </p>
                <button
                  onClick={() => {
                    // 예제: 더미 mtPlan 생성
                    setMtPlan({
                      location: { name: "강원도 속초", reason: "경치 좋음", distance: "2시간" },
                      budget: { accommodation: 50000, meals: 20000, activities: 10000, transportation: 15000, total: 95000 },
                      schedule: [{ time: "10:00", activity: "출발", location: "학교" }],
                      items: { essential: ["텐트", "침낭"], recommended: ["간식", "모자"], provided: ["물", "간이 의자"] },
                      accommodation: { type: "펜션", capacity: 10, rooms: "2인실 5개", checkIn: "14:00", checkOut: "11:00", facilities: ["주방", "화장실", "주차장"] },
                    });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  ✨ MT 계획 시작하기
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">생성된 MT 계획</h2>
              <pre className="bg-white p-4 rounded-xl shadow-lg">{JSON.stringify(mtPlan, null, 2)}</pre>
              <button
                onClick={() => setMtPlan(null)}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
              >
                새로 만들기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-700 font-jua">알림</h2>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-0">
              <Notification onNavigateToOnboarding={onNavigateToOnboarding} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MtPlanner;