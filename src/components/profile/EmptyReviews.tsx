import { ReviewIconPlaceholder } from "@/assets/icons/ReviewIconPlaceholder";

export default function EmptyReviews() {
    return (
        <div className='empty-reviews-content'>
            <ReviewIconPlaceholder />

            <p className='main-message'>Sizda hozircha sharh yoq</p>
        </div>
    );
}
