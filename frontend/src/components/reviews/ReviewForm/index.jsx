import './ReviewForm.css';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReview } from '../../../actions/reviewActions';
import { Link } from 'react-router-dom';

const ReviewForm = ({ product, review, setShowCreateReview, setShowEditReview }) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUser);
    
    if (!review) review = {reviewerName: '', title: '', body: '', rating: 5, reviewerId: '', productId: ''}

    const clickedStates = [true, true, true, true, true];
    for (let i = clickedStates.length - 1; i >= review.rating; i--) {
        clickedStates[i] = false;
    }
    
    const [reviewerName, setReviewerName] = useState(review.reviewerName);
    const [selectedNameFormat, setSelectedNameFormat] = useState('John Smith');
    const [email, setEmail] = useState('');
    const [clickedRating, setClickedRating] = useState(clickedStates);
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);

    const formattedReviewerName = () => {
        switch(selectedNameFormat) {
            case 'John Smith':
                return reviewerName.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            case 'John S.':
                return reviewerName.split(' ').map((word, i) => {
                    if (i != 0) {
                        return word[0].toUpperCase() + '.';
                    } else {
                        return word[0].toUpperCase() + word.slice(1).toLowerCase();
                    }
                }).join(' ');
            case 'J.S.':
                return reviewerName.split(' ').map(word => word[0].toUpperCase() + '.').join('');
            case 'Anonymous':
                return reviewerName[0].toUpperCase() + '.';
        }
    }

    const handleStarClick = (e, index) => {
        e.preventDefault();
        let clickedStars = [...clickedRating];
        for (let i = 0; i < clickedStars.length; i++) {
            if (i <= index) clickedStars[i] = true;
            else clickedStars[i] = false;
        }
        setClickedRating(clickedStars);
    }

    const submitReview = e => {
        e.preventDefault();
        let rating;
        for (let i = clickedRating.length - 1; i >= 0; i--) {
            if (clickedRating[i] === true) {
                rating = i + 1;
                break;
            }
        }
        if (!review.id) {
            dispatch(createReview({ review: {reviewerName: formattedReviewerName(), title, body, rating, reviewerId: currentUserId, productId: product[product.length - 1].id} }));
            setReviewerName('');
            setEmail('');
            setClickedRating([true, true, true, true, true]);
            setTitle('');
            setBody('');
            setShowCreateReview(false);
        } else {
            dispatch(updateReview({ review: { id: review.id, reviewerName: formattedReviewerName(), title, body, rating, reviewerId: review.reviewerId, productId: review.productId } }));
            setShowEditReview(false);
        }
        
    }

    return (
        <form className='review-form'>
            <div>
                <label htmlFor='name'>Name (displayed publicly as <select onChange={e => setSelectedNameFormat(e.target.value)}>
                        <option>John Smith</option>
                        <option>John S.</option>
                        <option>J.S.</option>
                        <option>Anonymous</option>
                    </select>)
                </label>
                <input type='text' placeholder='Enter your name (public)' id='name' value={reviewerName} onChange={e => setReviewerName(e.target.value)} />
            </div>
            {/* <div>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' placeholder='Enter your email (private)' value={email} onChange={e => setEmail(e.target.value)} />
            </div> */}
            <div>
                <label htmlFor='rating'>Rating</label>
                <div className='rating-div' id='rating'>
                    <FaStar className={clickedRating[0] ? 'clicked-rating' : 'rating'} onClick={e => handleStarClick(e, 0)} />
                    <FaStar className={clickedRating[1] ? 'clicked-rating' : 'rating'} onClick={e => handleStarClick(e, 1)} />
                    <FaStar className={clickedRating[2] ? 'clicked-rating' : 'rating'} onClick={e => handleStarClick(e, 2)} />
                    <FaStar className={clickedRating[3] ? 'clicked-rating' : 'rating'} onClick={e => handleStarClick(e, 3)} />
                    <FaStar className={clickedRating[4] ? 'clicked-rating' : 'rating'} onClick={e => handleStarClick(e, 4)} />
                </div>
            </div>
            <div>
                <label htmlFor='title'>Review Title</label>
                <input id='title' type='text' placeholder='Give your review a title' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor='body'>Review</label>
                <textarea id='body' placeholder='Write your comments here' value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <Link className='underline-on-hover spaced' to='#' onClick={submitReview}>Submit Review</Link>
        </form>
    )
}

export default ReviewForm;