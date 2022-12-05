import ReactSkeleton, { SkeletonProps } from "react-loading-skeleton";
import styles from "./skeleton.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = (props: SkeletonProps) => {
  return <ReactSkeleton {...props} containerClassName={styles.skeleton} />;
};

export default Skeleton;
