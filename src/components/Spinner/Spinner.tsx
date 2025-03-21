// Copyright (c) 2024 by massimo (https://codepen.io/_massimo/pen/dOwQBz)
import styles from "./Spinner.module.scss";

function SpinnerCat() {
  return (
    <div role="status">
      <div className={styles.cat}>
        <div className={styles.paw}></div>
        <div className={styles.paw}></div>
        <div className={styles.shake}>
          <div className={styles.tail}></div>
          <div className={styles.main}>
            <div className={styles.head}></div>
            <div className={styles.body}>
              <div className={styles.leg}></div>
            </div>
            <div className={styles.face}>
              <div className={styles.mustache_cont}>
                <div className={styles.mustache}></div>
                <div className={styles.mustache}></div>
              </div>
              <div className={styles.mustache_cont}>
                <div className={styles.mustache}></div>
                <div className={styles.mustache}></div>
              </div>
              <div className={styles.nose}></div>
              <div className={styles.eye}></div>
              <div className={styles.eye}></div>
              <div className={styles.brow_cont}>
                <div className={styles.brow}></div>
                <div className={styles.brow}></div>
              </div>
              <div className={styles.brow_cont}>
                <div className={styles.brow}></div>
                <div className={styles.brow}></div>
              </div>
              <div className={styles.ear_l}>
                <div className={styles.inner}></div>
              </div>
              <div className={styles.ear_r}>
                <div className={styles.outer}></div>
                <div className={styles.inner}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinnerCat;
