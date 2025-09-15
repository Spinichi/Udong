import React, { useState } from 'react';

interface SignupProps {
  onNavigateToOnboarding: () => void;
  onNavigateToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigateToOnboarding, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    university: '',
    major: '',
    residence: '',
    phone: '',
    availabilities: [] as Array<{
      day_of_week: string;
      start_time: string;
      end_time: string;
    }>,
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addAvailability = () => {
    setFormData(prev => ({
      ...prev,
      availabilities: [...prev.availabilities, {
        day_of_week: '',
        start_time: '',
        end_time: ''
      }]
    }));
  };

  const removeAvailability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.filter((_, i) => i !== index)
    }));
  };

  const updateAvailability = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.map((avail, i) => {
        if (i === index) {
          const updated = { ...avail, [field]: value };

          // 시작 시간이 종료 시간보다 늦으면 종료 시간을 자동으로 조정
          if (field === 'start_time' && updated.end_time && value >= updated.end_time) {
            updated.end_time = '';
          }

          return updated;
        }
        return avail;
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  const days = [
    { value: 'monday', label: '월요일' },
    { value: 'tuesday', label: '화요일' },
    { value: 'wednesday', label: '수요일' },
    { value: 'thursday', label: '목요일' },
    { value: 'friday', label: '금요일' },
    { value: 'saturday', label: '토요일' },
    { value: 'sunday', label: '일요일' }
  ];

  const timeOptions: Array<{ value: string; label: string }> = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = `${hour < 12 ? '오전' : '오후'} ${(hour % 12 || 12)}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push({ value: timeString, label: displayTime });
    }
  }

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
      <div className="min-h-screen flex items-center relative z-20 py-20">
        {/* Left Side - Signup Form */}
        <div className="w-1/2 pl-16 pr-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-700 mb-1 font-jua leading-tight">
              동아리 관리 플랫폼
            </h1>
            <h2 className="text-3xl font-semibold mb-4 font-jua">
              <span className="text-orange-500">회원가입</span>
            </h2>
            <p className="text-gray-600 text-base font-gowun">
              몇 가지 정보만 입력하면 바로 동아리 활동을 시작할 수 있어요
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {/* Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">성별</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 text-sm"
                required
              >
                <option value="">선택하세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>

            {/* University (Optional) */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">대학교 (선택)</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="대학교명을 입력하세요"
              />
            </div>

            {/* Major (Optional) */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">전공 (선택)</label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="전공을 입력하세요"
              />
            </div>

            {/* Residence */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">거주지 (선택)</label>
              <input
                type="text"
                name="residence"
                value={formData.residence}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="거주지를 입력하세요"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 text-sm mb-2 font-gowun">연락처 (선택)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-white border-2 border-gray-200 rounded-md text-gray-500 font-gowun focus:outline-none focus:border-orange-300 placeholder-gray-400 text-sm"
                placeholder="예시) 01012348888"
                required
              />
            </div>

            {/* Available Times */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-600 text-sm font-gowun">활동 가능 시간</label>
                <button
                  type="button"
                  onClick={addAvailability}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-gowun transition-colors"
                >
                  + 시간 추가
                </button>
              </div>

              {formData.availabilities.length === 0 && (
                <p className="text-gray-400 text-sm font-gowun mb-2">활동 가능한 시간을 추가해주세요</p>
              )}

              {formData.availabilities.map((availability, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-md p-3 mb-3 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-gowun text-gray-600">시간 슬롯 {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAvailability(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-gray-600 text-xs mb-1 font-gowun">요일</label>
                      <select
                        value={availability.day_of_week}
                        onChange={(e) => updateAvailability(index, 'day_of_week', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-gray-300 rounded text-gray-500 font-gowun focus:outline-none focus:border-orange-300 text-sm"
                        required
                      >
                        <option value="">요일 선택</option>
                        {days.map(day => (
                          <option key={day.value} value={day.value}>{day.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 text-xs mb-1 font-gowun">시작 시간</label>
                        <select
                          value={availability.start_time}
                          onChange={(e) => updateAvailability(index, 'start_time', e.target.value)}
                          className="w-full px-2 py-2 bg-white border border-gray-300 rounded text-gray-500 font-gowun focus:outline-none focus:border-orange-300 text-sm"
                          required
                        >
                          <option value="">시작 시간 선택</option>
                          {timeOptions.map(time => (
                            <option key={time.value} value={time.value}>{time.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-xs mb-1 font-gowun">종료 시간</label>
                        <select
                          value={availability.end_time}
                          onChange={(e) => updateAvailability(index, 'end_time', e.target.value)}
                          className="w-full px-2 py-2 bg-white border border-gray-300 rounded text-gray-500 font-gowun focus:outline-none focus:border-orange-300 text-sm"
                          required
                        >
                          <option value="">종료 시간 선택</option>
                          {timeOptions
                            .filter(time => !availability.start_time || time.value > availability.start_time)
                            .map(time => (
                              <option key={time.value} value={time.value}>{time.label}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                required
              />
              <span className="ml-2 text-gray-600 font-gowun text-sm">이용약관 및 개인정보처리방침에 동의합니다</span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-2xl transition-colors border border-orange-400 font-gowun text-base"
            >
              회원가입
            </button>

            {/* Login link */}
            <div className="text-center">
              <p className="text-orange-400 font-gowun text-sm">
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-orange-600 hover:text-orange-500 font-medium underline"
                >
                  로그인
                </button>
              </p>
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

export default Signup;