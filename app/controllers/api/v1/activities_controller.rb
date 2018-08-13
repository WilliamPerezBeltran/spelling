# frozen_string_literal: true

module Api::V1
  class ActivitiesController < ApplicationController
    def index
      activity = Activity.new('Get up')

      render json: ::ActivitySerializer.new(activity).serialized_json
    end
  end
end
