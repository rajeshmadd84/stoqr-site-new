const rackPattern: string[][] = [
  ["full pulse", "", "full", "full pulse", "", "full", "", "full"],
  ["full", "full pulse", "", "full", "", "full", "full pulse", ""],
  ["", "full", "full pulse", "", "full", "", "full", "full"],
];

export default function WarehouseFloor() {
  return (
    <div className="floor" aria-hidden="true">
      <div className="floor-bar">
        <span>Warehouse Floor — WH-SG-01</span>
        <span className="live">
          <i />
          LIVE
        </span>
      </div>
      <div className="floor-body">
        <div className="dock in">
          <div className="chev">
            <span />
            <span />
            <span />
          </div>
          <div className="dlabel">
            Inbound
            <br />
            Dock
          </div>
          <div className="dval">DOOR&nbsp;3</div>
        </div>
        <div className="racks">
          {rackPattern.map((row, i) => (
            <div className="rack-row" key={i}>
              <span className="rack-tag">RACK&nbsp;{String.fromCharCode(65 + i)}</span>
              <div className="bins">
                {row.map((cls, j) => (
                  <div className={`bin${cls ? " " + cls : ""}`} key={j} />
                ))}
              </div>
            </div>
          ))}
          <div className="flow-lane">
            {[0, 1.4, 2.9, 4.2].map((d, i) => (
              <span className="pellet" key={i} style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
        </div>
        <div className="dock out">
          <div className="chev">
            <span />
            <span />
            <span />
          </div>
          <div className="dlabel">
            Outbound
            <br />
            Dispatch
          </div>
          <div className="dval">CARRIER</div>
        </div>
      </div>
      <div className="ticker">
        <span>
          <b>F2-A03-R12-L4</b> · stored
        </span>
        <span>
          <b>GRN-4471</b> · generated
        </span>
        <span>
          IMO <b>9385412</b> · MV Pacific Star
        </span>
        <span>
          <b>DSP-2207</b> · dispatched
        </span>
      </div>
    </div>
  );
}
