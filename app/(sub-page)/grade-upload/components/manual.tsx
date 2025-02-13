export default function Manual() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-2xl font-bold p-6 border-b-2 border-gray-100 md:text-4xl">
          한 번의 성적표 입력으로
          <br /> 맞춤형 결과를 확인하세요 !
        </h1>
        <div className="px-6 flex flex-col gap-2 md:text-lg md:px-0">
          <div>
            1.
            <a
              target="_blank"
              className="pl-1 text-primary hover:text-dark-hover"
              href="https://msi.mju.ac.kr/servlet/security/MySecurityStart"
            >
              MyiWeb MSI
            </a>
            에 접속 후 로그인(PC환경)
          </div>
          <div>2. 좌측 성적/졸업 메뉴 → 성적표(상담용,B4)</div>
          <div>3. 우측 상단 조회버튼 → 프린트 아이콘 </div>
          <div>4. 인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 </div>
          <div>5. 저장한 파일 업로드 </div>
        </div>
      </div>
    </div>
  );
}
