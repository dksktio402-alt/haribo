import EventCard from "./EventCard.jsx";

export default function EventSection() {
  return (
    <section className="event-section">
      <div className="event-inner">
        <h2 className="event-heading">EVENT</h2>

        <EventCard className="event-card event-card--large">
          <div className="event-card-bg" />
          <div className="event-card-photo" />
          <div className="event-info-row">
            <div className="event-info-text">
              <span className="event-badge">진행중</span>
              <p className="event-title">여름한정 트로피컬 메뉴 출시 기념 댓글 이벤트</p>
              <p className="event-date">이벤트 기간: 6/12(금) ~ 6/19(금)</p>
            </div>
            <a className="event-more" href="#">
              자세히 보기 →
            </a>
          </div>
        </EventCard>

        <EventCard className="event-card event-card--small event-card--small-top" delay={0.1}>
          <div className="event-info-row event-info-row--small">
            <div className="event-info-text event-info-text--small">
              <span className="event-badge">진행중</span>
              <p className="event-title event-title--small">하리보 NEW 광고영상 댓글 이벤트</p>
              <p className="event-desc">
                댓글로 친구를 태그해, 골드베렌 여름한정판 출시 소식을 전해보세요! 추첨을 통해 행운의 선물을 드립니다🎁
              </p>
              <p className="event-date event-date--small">이벤트 기간: 6/22(월) ~ 6/29(월)</p>
            </div>
            <a className="event-more event-more--small" href="#">
              자세히 보기 →
            </a>
          </div>
        </EventCard>

        <EventCard className="event-card event-card--small event-card--small-bottom" delay={0.2}>
          <div className="event-info-row event-info-row--small">
            <div className="event-info-text event-info-text--small">
              <span className="event-badge">진행중</span>
              <p className="event-title event-title--small">하리보 X GS25 콜라보 이벤트</p>
              <p className="event-desc">
                하리보와 함께하는 여름을 공유해주세요☀ #하리보여름 #골드베렌 태그하고 인증샷 올리면 추첨을 통해
                특별한 선물이 찾아갑니다🎀
              </p>
              <p className="event-date event-date--small">이벤트 기간: 7/7(화) ~ 7/14(화)</p>
            </div>
            <a className="event-more event-more--small" href="#">
              자세히 보기 →
            </a>
          </div>
        </EventCard>
      </div>
    </section>
  );
}
