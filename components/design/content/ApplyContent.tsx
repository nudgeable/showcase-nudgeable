import type { CSSProperties } from 'react';
export function ApplyContent() {
  return <>
    <section className="apply-new-hero unified-hero">
      <div className="container apply-new-hero-grid unified-hero-grid">
        <div className="apply-new-hero-copy">
          <div className="eyebrow">
            <span className="section-dash" />
            NUDGEABLE APPLY
          </div>
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Training completed.</span>
            <span className="hero-title-line">How much gets</span>
            <span className="hero-title-line"><span className="hero-title-highlight">applied?</span></span>
          </h1>
          <p>
            AI-designed action plans, WhatsApp and email nudges, and participant-level tracking after classroom training.
          </p>
          <a className="button" href="/#contact">Request a demo</a>
        </div>
        <div className="apply-clean-demo">
          <span className="eyebrow">SEE HOW APPLY WORKS</span>
          <button className="video-launch" data-video-id="UFVzE8T3Gyw" data-video-format="landscape" data-video-title="Nudgeable Apply demo" aria-label="Play the Nudgeable Apply demo">
            <img src="/assets/apply-demo-poster.jpg" alt="Nudgeable Apply video demonstration" width="1280" height="720" />
            <span className="play-button" aria-hidden="true">▶</span>
          </button>
        </div>
      </div>
    </section>
    <nav className="container apply-section-links" aria-label="Explore Apply">
      <a href="#participants">For participants</a>
      <a href="#for-teams">{"For HR & trainers"}</a>
      <a href="#use-cases">Use cases</a>
    </nav>
    <section className="section apply-participants" id="participants">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              FOR PARTICIPANTS
            </div>
            <h2>
              Put learning to work.
              <br />
              {"One action "}
              <span className="serif-word">at a time.</span>
            </h2>
          </div>
        </div>
        <div className="participant-layout">
          <div>
            <ol className="participant-benefits">
              <li>
                <span>01</span>
                <div>
                  <h3>A plan that fits your work</h3>
                  <p>
                    AI designs specific actions using your context, your company’s priorities and what the training covered.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Nudges where you already are</h3>
                  <p>Get your next action on WhatsApp or email, in the flow of your working day.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>One click. Progress recorded.</h3>
                  <p>Mark an action complete and see your progress. Small steps become easier to keep going.</p>
                </div>
              </li>
            </ol>
            <div className="field-team-note">
              <strong>For field teams and sales teams, too.</strong>
              <p>Learn and act away from a laptop. No new app to download or app rollout to coordinate.</p>
              <span className="channel-pill">WhatsApp + email</span>
            </div>
          </div>
          <div className="apply-mobile-example">
            <div className="apply-phone">
              <div className="apply-phone-status">
                <span>9:41</span>
                <i aria-hidden="true" />
                <span aria-hidden="true">▮▮ ▰</span>
              </div>
              <div className="apply-chat-header">
                <span className="apply-chat-avatar" aria-hidden="true">✓</span>
                <div>
                  <strong>Nudgeable Apply</strong>
                  <small>WhatsApp</small>
                </div>
              </div>
              <div className="apply-chat-body">
                <span className="apply-chat-date">Today</span>
                <div className="apply-chat-bubble">
                  <span className="example-kicker">EXAMPLE ACTION</span>
                  <p>In today’s team meeting, invite the quietest member to share their views.</p>
                  <span className="apply-chat-time">9:41 AM</span>
                  <button id="apply-complete-demo" type="button" aria-pressed="false">✓ Mark complete</button>
                </div>
                <div className="apply-phone-progress" role="status" id="apply-phone-progress">
                  <span>YOUR PROGRESS</span>
                  <strong>2 of 3 actions completed</strong>
                  <div className="phone-progress-track"><i id="phone-progress-fill" /></div>
                </div>
              </div>
              <div className="apply-phone-bottom" aria-hidden="true" />
            </div>
            <p className="product-demo-note">Interactive example. Try marking the action complete.</p>
          </div>
        </div>
        <div className="action-context">
          <div>
            <span className="eyebrow">HOW ACTIONS ARE DESIGNED</span>
            <h3>
              AI-designed.
              <br />
              Grounded in behavioral science.
            </h3>
          </div>
          <div className="context-inputs">
            <article>
              <span>01</span>
              <strong>Participant context</strong>
              <p>Their role, goals and work situation.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Company context</strong>
              <p>The priorities and environment they work in.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Training context</strong>
              <p>The concepts and behaviors covered in the session.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section className="section apply-hr-section" id="for-teams">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              {"FOR HR & TRAINERS"}
            </div>
            <h2>
              See what gets applied.
              <br />
              {"Know who needs "}
              <span className="serif-word">support.</span>
            </h2>
            <p>
              Track plans, individual actions and completion across batches, without chasing updates manually.
            </p>
          </div>
        </div>
        <div className="apply-dashboard-preview">
          <div className="apply-dashboard-heading">
            <div>
              <strong>Training application</strong>
              <span>People Leadership · Batch 01</span>
            </div>
            <span className="sample-data-label">ILLUSTRATIVE PRODUCT VIEW</span>
          </div>
          <div className="apply-dashboard-tabs" role="tablist" aria-label="Explore the example dashboard">
            <button id="dashboard-tab-overview" role="tab" aria-selected="true" aria-controls="dashboard-overview" data-dashboard-tab="overview">Batch overview</button>
            <button id="dashboard-tab-participants" role="tab" aria-selected="false" aria-controls="dashboard-participants" data-dashboard-tab="participants" tabIndex={-1}>Participant details</button>
            <button id="dashboard-tab-hub" role="tab" aria-selected="false" aria-controls="dashboard-hub" data-dashboard-tab="hub" tabIndex={-1}>Batch hub</button>
          </div>
          <div className="dashboard-tab-panel" id="dashboard-overview" role="tabpanel" aria-labelledby="dashboard-tab-overview">
            <div className="apply-summary-metrics">
              <div>
                <span>Participants</span>
                <strong>120</strong>
              </div>
              <div>
                <span>Plans generated</span>
                <strong>108</strong>
              </div>
              <div>
                <span>Personalized actions</span>
                <strong>648</strong>
              </div>
              <div>
                <span>Actions completed</span>
                <strong>432</strong>
              </div>
              <div>
                <span>Active participants</span>
                <strong>90</strong>
              </div>
              <div>
                <span>Need support</span>
                <strong>30</strong>
              </div>
            </div>
            <figure className="apply-weekly-chart">
              <figcaption>
                <strong>Weekly action completion</strong>
                <span className="chart-legend">
                  <span>
                    <i className="legend-due" />
                    Actions due
                  </span>
                  <span>
                    <i className="legend-done" />
                    Completed
                  </span>
                </span>
              </figcaption>
              <div className="weekly-chart-plot" role="img" aria-label="Illustrative weekly actions due and completed. Week 1: 72 and 41. Week 2: 96 and 61. Week 3: 108 and 72. Week 4: 120 and 79. Week 5: 120 and 87. Week 6: 132 and 92.">
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "54.55%" } as CSSProperties}><span>72</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "31.06%" } as CSSProperties}><span>41</span></div>
                  </div>
                  <span>Week 1</span>
                </div>
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "72.73%" } as CSSProperties}><span>96</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "46.21%" } as CSSProperties}><span>61</span></div>
                  </div>
                  <span>Week 2</span>
                </div>
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "81.82%" } as CSSProperties}><span>108</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "54.55%" } as CSSProperties}><span>72</span></div>
                  </div>
                  <span>Week 3</span>
                </div>
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "90.91%" } as CSSProperties}><span>120</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "59.85%" } as CSSProperties}><span>79</span></div>
                  </div>
                  <span>Week 4</span>
                </div>
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "90.91%" } as CSSProperties}><span>120</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "65.91%" } as CSSProperties}><span>87</span></div>
                  </div>
                  <span>Week 5</span>
                </div>
                <div className="weekly-chart-group">
                  <div className="weekly-bars">
                    <div className="weekly-bar due" style={{ "--bar-height": "100.00%" } as CSSProperties}><span>132</span></div>
                    <div className="weekly-bar done" style={{ "--bar-height": "69.70%" } as CSSProperties}><span>92</span></div>
                  </div>
                  <span>Week 6</span>
                </div>
              </div>
            </figure>
          </div>
          <div className="dashboard-tab-panel" id="dashboard-participants" role="tabpanel" aria-labelledby="dashboard-tab-participants" hidden>
            <div className="participant-panel-heading">
              <div>
                <h3>From totals to individual actions</h3>
                <p>See who viewed an action, who completed it and who may need a check-in.</p>
              </div>
              <span className="sample-data-label">FICTIONAL PARTICIPANTS</span>
            </div>
            <div className="participant-table-wrap">
              <table className="apply-participant-table">
                <thead>
                  <tr>
                    <th scope="col">Participant</th>
                    <th scope="col">Actions planned</th>
                    <th scope="col">Actions viewed</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Status</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Aarav
                      <small>Example participant</small>
                    </th>
                    <td>6</td>
                    <td>6</td>
                    <td><b>5</b></td>
                    <td><span className="participant-status active">Active</span></td>
                    <td>
                      <button type="button" className="view-participant" data-participant="aarav" aria-label="View Aarav’s example actions">View actions</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Meera
                      <small>Example participant</small>
                    </th>
                    <td>6</td>
                    <td>4</td>
                    <td><b>2</b></td>
                    <td><span className="participant-status needs-support">Needs support</span></td>
                    <td>
                      <button type="button" className="view-participant" data-participant="meera" aria-label="View Meera’s example actions">View actions</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Dev
                      <small>Example participant</small>
                    </th>
                    <td>6</td>
                    <td>6</td>
                    <td><b>6</b></td>
                    <td><span className="participant-status active">Active</span></td>
                    <td>
                      <button type="button" className="view-participant" data-participant="dev" aria-label="View Dev’s example actions">View actions</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="support-feature-note">
              <strong>A support nudge, in one click.</strong>
              <p>Open a participant’s actions to preview a WhatsApp or email follow-up.</p>
            </div>
          </div>
          <div className="dashboard-tab-panel" id="dashboard-hub" role="tabpanel" aria-labelledby="dashboard-tab-hub" hidden>
            <div className="participant-panel-heading">
              <div>
                <h3>One place for the batch</h3>
                <p>Bring participants, materials and conversations together before and after the session.</p>
              </div>
            </div>
            <div className="batch-hub-grid">
              <article>
                <span>01</span>
                <h4>{"Batches & participants"}</h4>
                <p>Create batches and manage who takes part.</p>
              </article>
              <article>
                <span>02</span>
                <h4>Training dates</h4>
                <p>Set and update the session schedule.</p>
              </article>
              <article>
                <span>03</span>
                <h4>Teams</h4>
                <p>Organize participants into working groups.</p>
              </article>
              <article>
                <span>04</span>
                <h4>Training content</h4>
                <p>Upload pre-reads, videos and quizzes.</p>
              </article>
              <article>
                <span>05</span>
                <h4>Announcements</h4>
                <p>Share updates with the whole batch.</p>
              </article>
              <article>
                <span>06</span>
                <h4>Conversations</h4>
                <p>Let participants talk before and after training.</p>
              </article>
            </div>
          </div>
          <div className="dashboard-preview-footnote">Product preview with sample data. No real participant records or messages are used.</div>
        </div>
      </div>
    </section>
    <section className="section apply-use-cases" id="use-cases">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              USE CASES
            </div>
            <h2>
              Different training.
              <br />
              {"The same focus on "}
              <span className="serif-word">application.</span>
            </h2>
            <p>
              Four contexts where Apply has been used. All figures below are illustrative, not reported client outcomes.
            </p>
          </div>
        </div>
        <div className="apply-cases-grid">
          <article className="apply-case">
            <div className="case-top">
              <span>E-COMMERCE</span>
              <span>ILLUSTRATIVE METRICS</span>
            </div>
            <h3>Customer centricity</h3>
            <p>Nudging customer-focused actions for a large e-commerce business.</p>
            <div className="case-adoption">
              <strong>
                78
                <span>%</span>
              </strong>
              <span>adoption</span>
            </div>
            <div className="case-chart-title">
              {"Weekly actions "}
              <span>nudged / completed</span>
            </div>
            <div className="case-weekly-bars" role="img" aria-label="Sample weekly actions nudged and completed: 120 and 74, 144 and 98, 156 and 118, 168 and 133.">
              <div>
                <div className="case-bar-pair">
                  <i style={{ height: "71.43%" }} className="case-bar-nudged"><span>120</span></i>
                  <i style={{ height: "44.05%" }} className="case-bar-complete"><span>74</span></i>
                </div>
                <span>W1</span>
              </div>
              <div>
                <div className="case-bar-pair">
                  <i style={{ height: "85.71%" }} className="case-bar-nudged"><span>144</span></i>
                  <i style={{ height: "58.33%" }} className="case-bar-complete"><span>98</span></i>
                </div>
                <span>W2</span>
              </div>
              <div>
                <div className="case-bar-pair">
                  <i style={{ height: "92.86%" }} className="case-bar-nudged"><span>156</span></i>
                  <i style={{ height: "70.24%" }} className="case-bar-complete"><span>118</span></i>
                </div>
                <span>W3</span>
              </div>
              <div>
                <div className="case-bar-pair">
                  <i style={{ height: "100.00%" }} className="case-bar-nudged"><span>168</span></i>
                  <i style={{ height: "79.17%" }} className="case-bar-complete"><span>133</span></i>
                </div>
                <span>W4</span>
              </div>
            </div>
            <div className="case-foot">
              <b>588</b>
              {" actions nudged · "}
              <b>423</b>
              {" completed"}
            </div>
          </article>
          {' '}
          <article className="apply-case">
            <div className="case-top">
              <span>PHARMA</span>
              <span>ILLUSTRATIVE METRICS</span>
            </div>
            <h3>{"Well-being & resilience"}</h3>
            <p>Supporting everyday well-being actions in a large pharma company.</p>
            <div className="case-adoption">
              <strong>
                64
                <span>%</span>
              </strong>
              <span>adoption</span>
            </div>
            <div className="case-chart-title">Participant engagement</div>
            <div className="engagement-track" role="img" aria-label="Illustrative engagement: 128 active participants and 72 not yet active, out of 200."><i style={{ width: "64%" }} /></div>
            <div className="engagement-labels">
              <div>
                <strong>128</strong>
                <span>Active</span>
              </div>
              <div>
                <strong>72</strong>
                <span>Not yet active</span>
              </div>
            </div>
            <div className="case-foot">A view of who may need a check-in.</div>
          </article>
          {' '}
          <article className="apply-case">
            <div className="case-top">
              <span>CONSUMER PRODUCTS</span>
              <span>ILLUSTRATIVE METRICS</span>
            </div>
            <h3>People leadership</h3>
            <p>Helping participants practise people-leadership behaviors at work.</p>
            <div className="case-adoption">
              <strong>
                83
                <span>%</span>
              </strong>
              <span>adoption</span>
            </div>
            <div className="case-chart-title">Voluntary follow-through</div>
            <div className="voluntary-case-metric">
              <strong>
                {"274 "}
                <span>/ 342</span>
              </strong>
              <p>Chosen actions completed voluntarily</p>
            </div>
            <div className="case-meter" role="img" aria-label="274 of 342 chosen actions completed voluntarily"><i style={{ width: "80.12%" }} /></div>
            <div className="case-foot">Participants choose their own workplace actions.</div>
          </article>
          {' '}
          <article className="apply-case">
            <div className="case-top">
              <span>BANKING · INDIA</span>
              <span>ILLUSTRATIVE METRICS</span>
            </div>
            <h3>Role competencies</h3>
            <p>Nudging role-specific competencies for a large bank in India.</p>
            <div className="case-adoption">
              <strong>
                57
                <span>%</span>
              </strong>
              <span>adoption</span>
            </div>
            <div className="case-chart-title">Action completion by competency</div>
            <div className="competency-meters">
              <div>
                <span>Customer conversations</span>
                <b>71%</b>
                <div className="case-meter"><i style={{ width: "71%" }} /></div>
              </div>
              <div>
                <span>Decision-making</span>
                <b>65%</b>
                <div className="case-meter"><i style={{ width: "65%" }} /></div>
              </div>
              <div>
                <span>Follow-through</span>
                <b>57%</b>
                <div className="case-meter"><i style={{ width: "57%" }} /></div>
              </div>
            </div>
            <div className="case-foot">See where application needs more support.</div>
          </article>
        </div>
        <p className="adoption-definition">In these examples, adoption means completing at least one action during the example period.</p>
      </div>
    </section>
    <section className="contact-redirect">
      <div className="container">
        <h2>
          Make your next training
          <br />
          <span className="serif-word">application measurable.</span>
        </h2>
        <a className="button" href="/#contact">Discuss your program</a>
      </div>
    </section>
    <dialog id="apply-participant-dialog" aria-labelledby="apply-person-title">
      <div className="apply-person-dialog-top">
        <div>
          <span className="example-kicker">ILLUSTRATIVE PARTICIPANT DETAIL</span>
          <h2 id="apply-person-title">Participant</h2>
        </div>
        <button id="close-apply-person" type="button" aria-label="Close participant details">✕</button>
      </div>
      <div id="apply-person-content" />
    </dialog>
    <dialog id="video-player" aria-labelledby="video-player-title">
      <div className="video-dialog-top">
        <h2 id="video-player-title">Watch video</h2>
        <button id="close-video" aria-label="Close video">✕</button>
      </div>
      <div id="video-embed" />
      <a id="watch-youtube" className="video-youtube-link" target="_blank" rel="noopener">Watch on YouTube</a>
    </dialog>
  </>;
}
