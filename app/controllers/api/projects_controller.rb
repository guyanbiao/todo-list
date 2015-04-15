class Api::ProjectsController < ApplicationController
  #before_action :authenticate_user!
  def index
    render json: current_user.projects.map {|x| {id: x.id.to_s, title: x.title}}
  end

  def create
    pr = Project.new(title: params[:title], user: current_user)
    if pr.save
      render json: current_user.projects.map {|x| {id: x.id.to_s, title: x.title}}
    else
      #TODO i18n
      render json: {message: pr.errors.full_messages}, status: 400
    end
  end

  def destroy
    pr = Project.find params[:id]
    pr.delete
    render json: current_user.projects.map {|x| {id: x.id.to_s, title: x.title}}
  end
end
