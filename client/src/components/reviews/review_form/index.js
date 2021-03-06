import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import { Btn, Flex, FormStyled } from '../../styles/styled_global';
import queryString from 'query-string';
import { BEARER } from '../../../redux/constants';
import { useToasts } from 'react-toast-notifications'
import strings from './strings';

const { REACT_APP_API } = process.env;

const ReviewForm = () => {
	const theme = useSelector(state => state.globalReducer.theme);
	const language = useSelector(state => state.globalReducer.language);
	const s = strings[language];

	const location = useLocation();
	const history = useHistory();
	const { id } = useParams();
	const { game } = queryString.parse(location.search);
	const { addToast } = useToasts()

	const [review, setReview] = useState({
		score: 0,
		description: ''
	});

	const setNewRating = (rating) => setReview({
		...review,
		score: rating
	});

	const handleInput = (ev) => {
		setReview({
			...review,
			description: ev.target.value
		})
	}

	const handleSubmit = (ev) => {
		ev.preventDefault();
		axios.post(`${REACT_APP_API}/products/${id}/review`, review, BEARER())
			.then(() => {
				addToast(s.toastSuccess, {
					appearance: 'success'
				})
				history.goBack();
			})
			.catch(() => {
				addToast(s.toastError, {
					appearance: 'error'
				})
			})
	}

	return (
		<>
			<h2>{s.title} {game}</h2>
			<Flex>
				<FormStyled onSubmit={handleSubmit} className="text-center">
					<span className="mr-1">{s.score}</span>
					<StarRatings
						rating={review.score}
						name="ratingStars"
						isSelectable={true}
						changeRating={setNewRating}
						starRatedColor={theme === 'light' ? 'var(--clr-dark)' : 'var(--clr-primary)'}
						starDimension="1.5em"
						starSpacing="0"
						starHoverColor='var(--clr-primary)'
					/>
					<label className="mt-1">
						<span>{s.comment}</span>
						<textarea onChange={handleInput} value={review.description}></textarea>
					</label>
					<Btn className="btn btn-ppal">{s.send}</Btn>
				</FormStyled>
			</Flex>
		</>
	)
}

export default ReviewForm