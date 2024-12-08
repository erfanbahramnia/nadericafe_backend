export enum InternalServerErrorEnum {
    CouldNotSaveArticle = "Could not save new article",
    CouldNotDeleteArticle = "Could not delete article",
    CouldNotUpdateArticle = "Could not update article",
    CouldNotSaveCategory = "Could not save new cateogry",
    CouldNotDeleteCateogry = "Could not delete cateogry",
    CouldNotUpdateCategory = "Could not update category",
}

export enum BadRequestErrorEnum {
    ImageFormatIsNotValid ="Image format is not valid",
    PleaseUplaodImage ="Please uplaod image",
    PleaseUplaodData ="Please uplaod data!",
    UsernameHasBeenUsed = "This username has been used",
    PhoneHasBeenUsed = "This phone number has been used",
    ArticleStatus = "Article status is not valid!"
}

export enum NotFoundErrorEnum {
    ArticleNotFound ="Article not found!",
    CategoryNotFound ="Cateogry not found!",
    PropertyNotFound ="Property not found!",
    UserNotFound ="user not found!",
    FoodNotFound = "Food not found!",
    ReservationNotFound = "Reservation not found!",
}

export enum SuccessMessageEnum {
    ArticleDeleted ="Article deleted successfuly",
    CategoryDeleted ="Category deleted successfuly",
}