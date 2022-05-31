import React, { Fragment } from "react"
import MealsSummary from "./MealsSummary"
import AvailableMeals from "./AvalibleMeals"

const Meals = (props) => {
	return (
		<Fragment>
			<MealsSummary />
			<AvailableMeals />
		</Fragment>
	)
}

export default Meals