plugin.tx_find {
	settings {
		connection {
			host = 127.0.0.1
			# host = vlib.sub.uni-goettingen.de
			port = 8080
			path = /solr/germania-sacra
		}
		queryFields {
			0 {
				query = {!join from=kloster_id to=id}(###term### AND typ:standort-orden)
			}
			10 {
				id = bistum
				type = Text
				extended = 1
				autocomplete = 1
				autocompleteDictionary = bistum_suggest
			}
			20 {
				id = orden
				type = Text
				extended = 1
				autocomplete = 1
				autocompleteDictionary = orden_suggest
			}
			30 {
				id = ort
				type = Text
				extended = 1
				autocomplete = 1
				autocompleteDictionary = ort_suggest
			}

		}
		sort {
			1 {
				id = default
				sortCriteria = ort_sort asc,von asc
			}
		}
		standardFields {
			title = kloster
			snippet = uebersetzung
		}
		facets {
			10 {
				id = orden
				field = orden_facet
				autocomplete = 1
				query = {!join from=kloster_id to=id}(orden_facet:"###term###" AND typ:standort-orden)
			}
			20 {
				id = jahr50
				field = jahr50
				type = Histogram
				query = {!join from=kloster_id to=id}(orden_standort_jahr50:###term### AND typ:standort-orden)
				sortOrder = index
				fetchMaximum = 1000
				barWidth = 50
			}
			30 {
				id = bistum
				field = bistum_facet
				autocomplete = 1
				query = {!join from=kloster_id to=id}(bistum_facet:"###term###" AND typ:standort-orden)
			}
			40 {
				id = land
				field = land_facet
				autocomplete = 1
				query = {!join from=kloster_id to=id}(land_facet:"###term###" AND typ:standort-orden)
			}
		}
		highlight {
			fields.1 = *
			useQueryTerms = 1
			useFacetTerms = 1
		}
		additionalFilters {
			1 = typ:kloster
			# 2 = bearbeitungsstatus:Online
		}
		CSSPaths.50 = EXT:find/Projects/germania-sacra/Resources/germania-sacra.css

		languageRootPath = EXT:find/Projects/germania-sacra/Language/
	}
	view {
		templateRootPath = EXT:find/Projects/germania-sacra/Templates/
		partialRootPath = EXT:find/Projects/germania-sacra/Partials/
	}
}
