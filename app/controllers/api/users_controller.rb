class Api::UsersController < ApplicationController
  def create
    @user = User.new()
    if @user.save!
      @user.login
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
