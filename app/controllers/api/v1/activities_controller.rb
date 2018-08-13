# frozen_string_literal: true

require 'net/http'

module Api::V1
  class ActivitiesController < ApplicationController
    DATAMUSE_API_BASE = 'https://api.datamuse.com/'

    def index
      begin
        data = JSON.parse(
          Net::HTTP.get(URI("#{DATAMUSE_API_BASE}words?topics=literature"))
        )
      rescue StandardError => error
        dict = JSON.parse(open(Rails.root.join('app', 'data', 'words.json')).read)
        data = [{ 'word' => dict.sample }]
      end

      activity = Activity.new(
        data.select { |result| result['word'].length < 10 }.sample['word']
      )

      render json: ::ActivitySerializer.new(activity).serialized_json
    end
  end
end
